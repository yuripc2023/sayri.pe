#!/bin/bash
# Uso: ./prod_deploy.sh (inicia aws login si la sesion no esta activa).

set -euo pipefail

declare -A sites=(
  ["sayri.pe"]="s3://sayri.pe/|ER2ML21H66IH5"
)

# Asegura que el script se ejecute siempre desde la raiz del proyecto
PROJECT_ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "$PROJECT_ROOT"

handle_error() {
  echo "Error: $1"
  exit 1
}

command -v aws >/dev/null 2>&1 \
  || handle_error "AWS CLI no esta instalado o no se encuentra en PATH."
command -v pnpm >/dev/null 2>&1 \
  || handle_error "pnpm no esta instalado o no se encuentra en PATH."

echo "Compilando SAYRI..."
pnpm build \
  || handle_error "Fallo la compilacion. No se subieron archivos."
[ -s "$PROJECT_ROOT/dist/index.html" ] \
  || handle_error "No se genero dist/index.html. No se subieron archivos."

export AWS_DEFAULT_REGION="${AWS_DEFAULT_REGION:-us-east-1}"

echo "Validando sesion AWS..."
if ! aws sts get-caller-identity --no-cli-pager >/dev/null 2>&1; then
  echo "No se pudo validar la sesion AWS. Iniciando aws login..."
  aws login \
    || handle_error "No se completo el login de AWS. No se subieron archivos."

  aws sts get-caller-identity --no-cli-pager >/dev/null \
    || handle_error "La sesion AWS sigue sin estar disponible despues del login. No se subieron archivos."
fi
echo "Sesion AWS validada."

for site in "${!sites[@]}"; do
  echo "Desplegando sitio: $site"

  IFS='|' read -r s3_bucket cloudfront_distribution_id <<< "${sites[$site]}"

  echo "Bucket S3: $s3_bucket"
  echo "Region AWS: $AWS_DEFAULT_REGION"

  aws s3 cp "$PROJECT_ROOT/dist/" "$s3_bucket" \
    --recursive \
    --cache-control "max-age=0, must-revalidate" \
    --exclude ".*" \
    --exclude "*/.*" \
    --no-progress \
    || handle_error "No se pudieron subir los archivos al bucket S3 para $site."

  cloudfront_distribution_id="${CLOUDFRONT_DISTRIBUTION_ID:-$cloudfront_distribution_id}"
  if [ -n "$cloudfront_distribution_id" ]; then
    if aws cloudfront create-invalidation \
      --distribution-id "$cloudfront_distribution_id" \
      --paths "/*"; then
      echo "Invalidacion de CloudFront solicitada para $site."
    else
      handle_error "Los archivos se subieron a S3, pero fallo la invalidacion de CloudFront para $site."
    fi
  else
    echo "CloudFront no fue invalidado porque no se configuro CLOUDFRONT_DISTRIBUTION_ID."
  fi

  echo "Despliegue para $site completado."
done
