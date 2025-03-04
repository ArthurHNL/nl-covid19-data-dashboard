import { Gedrag } from '@corona-dashboard/icons';
import { GetStaticPropsContext } from 'next';
import { ChartTile } from '~/components/chart-tile';
import { KpiTile } from '~/components/kpi-tile';
import { KpiValue } from '~/components/kpi-value';
import { Markdown } from '~/components/markdown';
import { PageInformationBlock } from '~/components/page-information-block';
import { TileList } from '~/components/tile-list';
import { TwoKpiSection } from '~/components/two-kpi-section';
import { InlineText, Text } from '~/components/typography';
import { Layout } from '~/domain/layout/layout';
import { VrLayout } from '~/domain/layout/vr-layout';
import { SituationsDataCoverageTile } from '~/domain/situations/situations-data-coverage-tile';
import { SituationsOverTimeChart } from '~/domain/situations/situations-over-time-chart';
import { SituationsTableTile } from '~/domain/situations/situations-table-tile';
import { useIntl } from '~/intl';
import { withFeatureNotFoundPage } from '~/lib/features';
import {
  getArticleParts,
  getPagePartsQuery,
} from '~/queries/get-page-parts-query';
import {
  createGetStaticProps,
  StaticProps,
} from '~/static-props/create-get-static-props';
import {
  createGetContent,
  getLastGeneratedDate,
  selectVrData,
} from '~/static-props/get-data';
import { ArticleParts, PagePartQueryResult } from '~/types/cms';
import { replaceComponentsInText } from '~/utils/replace-components-in-text';
import { replaceVariablesInText } from '~/utils/replace-variables-in-text';

export { getStaticPaths } from '~/static-paths/vr';

export const getStaticProps = withFeatureNotFoundPage(
  'situationsPage',
  createGetStaticProps(
    getLastGeneratedDate,
    selectVrData('situations'),
    async (context: GetStaticPropsContext) => {
      const { content } = await createGetContent<
        PagePartQueryResult<ArticleParts>
      >(() => getPagePartsQuery('situationsPage'))(context);

      return {
        content: {
          articles: getArticleParts(
            content.pageParts,
            'situationsPageArticles'
          ),
        },
      };
    }
  )
);

export default function BrononderzoekPage(
  props: StaticProps<typeof getStaticProps>
) {
  const { selectedVrData: data, lastGenerated, content, vrName } = props;

  const intl = useIntl();
  const { formatNumber, formatDateSpan } = intl;

  const text = intl.siteText.brononderzoek;

  const metadata = {
    ...intl.siteText.nationaal_metadata,
    title: text.metadata.title,
    description: text.metadata.description,
  };

  const lastValue = data.situations.last_value;
  const values = data.situations.values;

  const [date_from, date_to] = formatDateSpan(
    { seconds: lastValue.date_start_unix },
    { seconds: lastValue.date_end_unix }
  );

  return (
    <Layout {...metadata} lastGenerated={lastGenerated}>
      <VrLayout vrName={vrName}>
        <TileList>
          <PageInformationBlock
            category={intl.siteText.nationaal_layout.headings.besmettingen}
            screenReaderCategory={
              intl.siteText.sidebar.metrics.source_investigation.title
            }
            title={replaceVariablesInText(
              intl.siteText.common.subject_in_location,
              {
                subject: text.titel,
                location: vrName,
              }
            )}
            icon={<Gedrag />}
            description={text.pagina_toelichting}
            metadata={{
              datumsText: text.datums,
              dateOrRange: {
                start: lastValue.date_start_unix,
                end: lastValue.date_end_unix,
              },
              dateOfInsertionUnix: lastValue.date_of_insertion_unix,
              dataSources: [text.bronnen.rivm],
            }}
            referenceLink={text.reference.href}
            articles={content.articles}
          />

          <TwoKpiSection>
            <SituationsDataCoverageTile data={lastValue} />
            {lastValue.has_sufficient_data && (
              <KpiTile
                title={text.veiligheidsregio_kpi.titel}
                metadata={{
                  date: [lastValue.date_start_unix, lastValue.date_end_unix],
                  source: text.bronnen.rivm,
                }}
              >
                {lastValue.situations_known_percentage && (
                  <KpiValue
                    percentage={lastValue.situations_known_percentage}
                  />
                )}
                <Markdown
                  content={replaceVariablesInText(
                    text.veiligheidsregio_kpi.beschrijving,
                    {
                      date_to,
                      date_from,
                    }
                  )}
                />

                <Text fontWeight="bold">
                  {replaceComponentsInText(
                    text.veiligheidsregio_kpi.beschrijving_bekend,
                    {
                      situations_known_total: (
                        <InlineText color="data.primary">
                          {formatNumber(lastValue.situations_known_total)}
                        </InlineText>
                      ),
                      investigations_total: (
                        <InlineText color="data.primary">
                          {formatNumber(lastValue.investigations_total)}
                        </InlineText>
                      ),
                    }
                  )}
                </Text>
              </KpiTile>
            )}
          </TwoKpiSection>

          <SituationsTableTile
            data={lastValue}
            metadata={{
              date: [lastValue.date_start_unix, lastValue.date_end_unix],
              source: text.bronnen.rivm,
            }}
          />

          {values && (
            <ChartTile
              title={text.situaties_over_tijd_grafiek.titel}
              description={text.situaties_over_tijd_grafiek.omschrijving}
              metadata={{ source: text.bronnen.rivm }}
            >
              <SituationsOverTimeChart timeframe={'all'} values={values} />
            </ChartTile>
          )}
        </TileList>
      </VrLayout>
    </Layout>
  );
}
