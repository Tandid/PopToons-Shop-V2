import { useRouter } from "next/router";
import Layout from "../components/Layout";

const Unauthorized: React.FC = (): React.ReactElement => {
  const router = useRouter();
  const { message } = router.query;

  return (
    <Layout title="Unauthorized Page">
      <div>
        <h1 className="text-xl">Access Denied</h1>
        {message && <div className="mb-4 text-red-500">{message}</div>}
      </div>
    </Layout>
  );
};

export default Unauthorized;
