async function uriToFile(uri: string): Promise<File> {
  let filename = uri.split("/").pop() as string;

  const response = await fetch(uri);
  const data = await response.blob();
  return new File([data], filename, {
    type: response.headers.get("content-type"),
  });
}

export { uriToFile };
