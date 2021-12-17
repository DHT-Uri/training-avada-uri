import loadable from "react-loadable";
import {Card, Layout, Page, SkeletonBodyText} from "@shopify/polaris";
import React from "react";

const Loading = () => (
  <Page>
    <Layout>
      <Layout.Section>
        <Card>
          <Card.Section>
            <SkeletonBodyText lines={5} />
          </Card.Section>
        </Card>
        <Card>
          <Card.Section>
            <SkeletonBodyText lines={5} />
          </Card.Section>
        </Card>
      </Layout.Section>
    </Layout>
  </Page>
);

export default loadable({
  loader: () => import("../pages/Todo/TodoList"),
  loading: Loading
});
