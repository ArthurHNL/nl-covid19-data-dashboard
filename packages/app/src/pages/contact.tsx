import css from '@styled-system/css';
import Head from 'next/head';
import styled from 'styled-components';
import { RichContent } from '~/components/cms/rich-content';
import { Heading } from '~/components/typography';
import { Content } from '~/domain/layout/content';
import { Layout } from '~/domain/layout/layout';
import { useIntl } from '~/intl';
import {
  createGetStaticProps,
  StaticProps,
} from '~/static-props/create-get-static-props';
import {
  createGetContent,
  getLastGeneratedDate,
} from '~/static-props/get-data';
import { RichContentBlock } from '~/types/cms';

interface ContactData {
  title: string | null;
  description: RichContentBlock[] | null;
}

export const getStaticProps = createGetStaticProps(
  getLastGeneratedDate,
  createGetContent<ContactData>((context) => {
    const { locale } = context;

    return `*[_type == 'contact']{
      title,
      "description": {
        "_type": description._type,
        "${locale}": [
          ...description.${locale}[]
          {
            ...,
            "asset": asset->
           },
        ]
      }
    }[0]
    `;
  })
);

const Contact = (props: StaticProps<typeof getStaticProps>) => {
  const { siteText } = useIntl();
  const { content, lastGenerated } = props;

  return (
    <Layout {...siteText.contact_metadata} lastGenerated={lastGenerated}>
      <Head>
        <link
          key="dc-type"
          rel="dcterms:type"
          href="https://standaarden.overheid.nl/owms/terms/webpagina"
        />
        <link
          key="dc-type-title"
          rel="dcterms:type"
          href="https://standaarden.overheid.nl/owms/terms/webpagina"
          title="webpagina"
        />
      </Head>

      <Content>
        {content.title && <Heading level={1}>{content.title}</Heading>}
        {content.description && (
          <RichContent
            blocks={content.description}
            contentWrapper={RichContentWrapper}
          />
        )}
      </Content>
    </Layout>
  );
};

const RichContentWrapper = styled.div(
  css({
    maxWidth: 'maxWidthText',
    width: '100%',
  })
);

export default Contact;
