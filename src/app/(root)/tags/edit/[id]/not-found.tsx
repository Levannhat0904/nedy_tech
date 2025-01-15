import { Button, Result } from "antd";

export default function NotFound() {
  return (
    <div>
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
