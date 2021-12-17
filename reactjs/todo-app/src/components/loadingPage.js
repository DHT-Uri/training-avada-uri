import {Card, Layout, SkeletonBodyText, SkeletonDisplayText, SkeletonPage, TextContainer} from "@shopify/polaris";

/**
 *
 * @returns {JSX.Element}
 * @constructor
 */
const LoadingPage = () => {
    return (
        <SkeletonPage>
            <Layout>
                <Layout.Section>
                    <Card sectioned>
                        <TextContainer>
                            <SkeletonDisplayText size="medium" />
                            <SkeletonBodyText lines={9} />
                        </TextContainer>
                    </Card>
                </Layout.Section>
            </Layout>
        </SkeletonPage>
    );
};

export default LoadingPage;