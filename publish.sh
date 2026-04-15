#!/bin/bash
set -e

PACKAGES=(core sdk uniapp)
ROOT_DIR="$(cd "$(dirname "$0")" && pwd)"

usage() {
  echo "Usage: $0 <command>"
  echo ""
  echo "Commands:"
  echo "  version <patch|minor|major>  Bump version for all packages"
  echo "  publish                      Build and publish all packages in order"
}

bump_version() {
  local level="$1"
  if [[ ! "$level" =~ ^(patch|minor|major)$ ]]; then
    echo "Error: version level must be patch, minor, or major"
    exit 1
  fi

  echo "==> Bumping $level version for all packages..."
  for pkg in "${PACKAGES[@]}"; do
    cd "$ROOT_DIR/packages/$pkg"
    new_version=$(npm version "$level" --no-git-tag-version)
    echo "  $pkg -> $new_version"
  done
  echo "==> Done! All packages updated."
}

publish_all() {
  # Build packages that need building
  echo "==> Building core..."
  cd "$ROOT_DIR/packages/core" && pnpm run build

  echo "==> Building sdk..."
  cd "$ROOT_DIR/packages/sdk" && pnpm run build

  # Publish in order
  for pkg in "${PACKAGES[@]}"; do
    echo "==> Publishing $pkg..."
    cd "$ROOT_DIR/packages/$pkg"
    pnpm publish --access public --no-git-checks
    echo "  $pkg published successfully!"
  done

  echo "==> All packages published!"
}

case "$1" in
  version)
    bump_version "$2"
    ;;
  publish)
    publish_all
    ;;
  *)
    usage
    exit 1
    ;;
esac
