import React from 'react';
import {CalloutCard, Page, Layout} from "@shopify/polaris";

const Home = () => {
    return (
        <Page title={'Home'}>
            <Layout>
                <Layout.Section>
                    <CalloutCard
                        title="Welcome to Todo app"
                        illustration="https://cdn.shopify.com/s/assets/admin/checkout/settings-customizecart-705f57c725ac05be5a34ec20c05b94298cb8afd10aac7bd9c7ad02030f48cfa0.svg"
                        primaryAction={{
                            content: 'Go to Todo List',
                            url: '/todo-list',
                        }}
                    >
                    </CalloutCard>
                </Layout.Section>
            </Layout>
        </Page>
    );
};

Home.propTypes = {};

export default Home;
