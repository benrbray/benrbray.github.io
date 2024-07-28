build:
  pnpm run build

preview:
  pnpm run build
  pnpm run preview

dev:
  pnpm run dev

publish:
  pnpm run build
  rm -rf docs
  cp -r dist docs
  touch docs/.nojekyll