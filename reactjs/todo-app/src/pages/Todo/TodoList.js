import Todoes from "../../components/Todoes";
import {Layout, Page, Card} from "@shopify/polaris";
import React from "react";

/**
 *
 * @returns {JSX.Element}
 * @constructor
 */
export default function TodoList() {
  return (
      <Page title="">
          <Layout>
              <Layout.Section>
                  <Card>
                      <Card.Section>
                          <Todoes />
                      </Card.Section>
                  </Card>
              </Layout.Section>
          </Layout>
      </Page>
  )
}


