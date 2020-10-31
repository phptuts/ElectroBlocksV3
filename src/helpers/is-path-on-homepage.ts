export function isPathOnHomePage(path: string) {
  if (path === "/") {
    return true;
  }

  const pathParts = path.split("/").slice(1);

  return pathParts.length === 2 && pathParts[0] === "project";
}
