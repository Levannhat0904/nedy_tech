import { Button, Result } from "antd";
import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      {/* <h2>Not Found id</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link> */}
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button href="/" type="link">
            Back Home
          </Button>
        }
      />
    </div>
  );
}
