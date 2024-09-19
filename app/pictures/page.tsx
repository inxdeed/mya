import Layout from "../../components/layout/layout";
import client from "../../tina/__generated__/client";
import PicturesClientPage from "./client-page";

export default async function PostsPage() {
  const pictures = await client.queries.pictureConnection();

  if (!pictures) {
    return null;
  }

  return (
    <Layout rawPageData={pictures.data}>
      <PicturesClientPage {...pictures} />
    </Layout>
  );
}
