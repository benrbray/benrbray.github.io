build:
  pnpm run build

preview:
  pnpm run build
  pnpm run preview

dev:
  pnpm run dev

host:
  pnpm run host

publish:
  pnpm run build
  rm -rf docs
  cp -r dist docs
  touch docs/.nojekyll