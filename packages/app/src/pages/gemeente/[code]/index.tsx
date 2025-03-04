import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { GmLayout } from '~/domain/layout/gm-layout';
import { Layout } from '~/domain/layout/layout';
import { useIntl } from '~/intl';
import {
  createGetStaticProps,
  StaticProps,
} from '~/static-props/create-get-static-props';
import { getLastGeneratedDate, selectGmData } from '~/static-props/get-data';
import { useReverseRouter } from '~/utils/use-reverse-router';

export { getStaticPaths } from '~/static-paths/gm';

export const getStaticProps = createGetStaticProps(
  getLastGeneratedDate,
  selectGmData('code')
);

const Municipality = (props: StaticProps<typeof getStaticProps>) => {
  const { lastGenerated, municipalityName, selectedGmData } = props;
  const router = useRouter();
  const { siteText } = useIntl();
  const reverseRouter = useReverseRouter();

  useEffect(() => {
    const route = reverseRouter.gm.index(selectedGmData.code);
    router.replace(route);
  }, [reverseRouter.gm, reverseRouter.vr, router, selectedGmData.code]);

  return (
    <Layout {...siteText.gemeente_index.metadata} lastGenerated={lastGenerated}>
      <GmLayout
        code={selectedGmData.code}
        municipalityName={municipalityName}
      />
    </Layout>
  );
};

export default Municipality;
