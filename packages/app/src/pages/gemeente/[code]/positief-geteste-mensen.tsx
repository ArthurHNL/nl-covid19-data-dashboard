import {
  GmCollectionTestedOverall,
  GmProperties,
} from '@corona-dashboard/common';
import Getest from '~/assets/test.svg';
import { ArticleStrip } from '~/components/article-strip';
import { ChartTile } from '~/components/chart-tile';
import { ChoroplethTile } from '~/components/choropleth-tile';
import { GmChoropleth } from '~/components/choropleth/gm-choropleth';
import { gmThresholds } from '~/components/choropleth/gm-thresholds';
import { PositiveTestedPeopleGmTooltip } from '~/components/choropleth/tooltips/municipal/positive-tested-people-gm-tooltip';
import { CollapsibleContent } from '~/components/collapsible';
import { ContentHeader } from '~/components/content-header';
import { KpiTile } from '~/components/kpi-tile';
import { KpiValue } from '~/components/kpi-value';
import { Markdown } from '~/components/markdown';
import { TileList } from '~/components/tile-list';
import { TimeSeriesChart } from '~/components/time-series-chart';
import { TwoKpiSection } from '~/components/two-kpi-section';
import { Text } from '~/components/typography';
import { GmLayout } from '~/domain/layout/gm-layout';
import { Layout } from '~/domain/layout/layout';
import { useIntl } from '~/intl';
import {
  ArticlesQueryResult,
  createPageArticlesQuery,
} from '~/queries/create-page-articles-query';
import {
  createElementsQuery,
  ElementsQueryResult,
  getTimelineEvents,
} from '~/queries/create-page-elements-query';
import {
  createGetStaticProps,
  StaticProps,
} from '~/static-props/create-get-static-props';
import {
  createGetChoroplethData,
  createGetContent,
  getLastGeneratedDate,
  selectGmPageMetricData,
} from '~/static-props/get-data';
import { filterByRegionGmCollection } from '~/static-props/utils/filter-by-region-gm-collection';
import { colors } from '~/style/theme';
import { replaceComponentsInText } from '~/utils/replace-components-in-text';
import { replaceVariablesInText } from '~/utils/replace-variables-in-text';
import { useReverseRouter } from '~/utils/use-reverse-router';
export { getStaticPaths } from '~/static-paths/gm';

export const getStaticProps = createGetStaticProps(
  getLastGeneratedDate,
  selectGmPageMetricData(
    'static_values',
    'tested_overall',
    'difference',
    'code'
  ),
  createGetChoroplethData({
    gm: ({ tested_overall }, context) => ({
      tested_overall: filterByRegionGmCollection(tested_overall, context),
    }),
  }),
  createGetContent<{
    fix_this: ArticlesQueryResult;
    elements: ElementsQueryResult;
  }>(() => {
    const locale = process.env.NEXT_PUBLIC_LOCALE || 'nl';
    return `{
      "fix_this": ${createPageArticlesQuery('positiveTestsPage', locale)},
      "elements": ${createElementsQuery('gm', ['tested_overall'], locale)}
    }`;
  })
);

const PositivelyTestedPeople = (props: StaticProps<typeof getStaticProps>) => {
  const {
    selectedGmData: data,
    sideBarData,
    choropleth,
    gmName,
    content,
    lastGenerated,
  } = props;

  const { siteText, formatNumber } = useIntl();
  const reverseRouter = useReverseRouter();
  const text = siteText.gemeente_positief_geteste_personen;
  const lastValue = data.tested_overall.last_value;
  const populationCount = data.static_values.population_count;

  const metadata = {
    ...siteText.gemeente_index.metadata,
    title: replaceVariablesInText(text.metadata.title, {
      municipalityName: gmName,
    }),
    description: replaceVariablesInText(text.metadata.description, {
      municipalityName: gmName,
    }),
  };

  return (
    <Layout {...metadata} lastGenerated={lastGenerated}>
      <GmLayout
        data={sideBarData}
        code={data.code}
        difference={data.difference}
        gmName={gmName}
        lastGenerated={lastGenerated}
      >
        <TileList>
          <ContentHeader
            category={siteText.gemeente_layout.headings.besmettingen}
            title={replaceVariablesInText(text.titel, {
              municipality: gmName,
            })}
            icon={<Getest />}
            subtitle={text.pagina_toelichting}
            metadata={{
              datumsText: text.datums,
              dateOrRange: lastValue.date_unix,
              dateOfInsertionUnix: lastValue.date_of_insertion_unix,
              dataSources: [text.bronnen.rivm],
            }}
            reference={text.reference}
          />

          <ArticleStrip articles={content.fix_this.articles} />

          <TwoKpiSection>
            <KpiTile
              title={text.kpi_titel}
              metadata={{
                date: lastValue.date_unix,
                source: text.bronnen.rivm,
              }}
            >
              <KpiValue
                data-cy="infected"
                absolute={lastValue.infected}
                difference={
                  data.difference.tested_overall__infected_moving_average
                }
                isMovingAverageDifference
              />
              <Text>
                {replaceComponentsInText(
                  siteText.gemeente_index.population_count,
                  {
                    municipalityName: gmName,
                    populationCount: (
                      <strong>{formatNumber(populationCount)}</strong>
                    ),
                  }
                )}
              </Text>
              <Markdown content={text.kpi_toelichting} />
            </KpiTile>

            <KpiTile
              title={text.barscale_titel}
              metadata={{
                date: lastValue.date_unix,
                source: text.bronnen.rivm,
              }}
            >
              <KpiValue
                data-cy="infected_per_100k"
                absolute={lastValue.infected_per_100k}
                difference={
                  data.difference
                    .tested_overall__infected_per_100k_moving_average
                }
                isMovingAverageDifference
              />
              <Text>{text.barscale_toelichting}</Text>

              <CollapsibleContent
                label={
                  siteText.gemeente_index.population_count_explanation_title
                }
              >
                <Text>
                  {replaceComponentsInText(text.population_count_explanation, {
                    municipalityName: <strong>{gmName}</strong>,
                    value: (
                      <strong>
                        {formatNumber(lastValue.infected_per_100k)}
                      </strong>
                    ),
                  })}
                </Text>
              </CollapsibleContent>
            </KpiTile>
          </TwoKpiSection>

          <ChartTile
            title={text.linechart_titel}
            description={text.linechart_toelichting}
            metadata={{
              source: text.bronnen.rivm,
            }}
            timeframeOptions={['all', '5weeks']}
          >
            {(timeframe) => (
              <TimeSeriesChart
                accessibility={{
                  key: 'confirmed_cases_infected_over_time_chart',
                }}
                values={data.tested_overall.values}
                timeframe={timeframe}
                seriesConfig={[
                  {
                    type: 'line',
                    metricProperty: 'infected_per_100k_moving_average',
                    label:
                      siteText.positief_geteste_personen.tooltip_labels
                        .infected_per_100k_moving_average,
                    color: colors.data.primary,
                  },
                  {
                    type: 'bar',
                    metricProperty: 'infected_per_100k',
                    label:
                      siteText.positief_geteste_personen.tooltip_labels
                        .infected_per_100k,
                    color: colors.data.primary,
                  },
                  {
                    type: 'invisible',
                    metricProperty: 'infected',
                    label: siteText.common.totaal,
                  },
                ]}
                dataOptions={{
                  benchmark: {
                    value: 7,
                    label: siteText.common.signaalwaarde,
                  },
                  timelineEvents: getTimelineEvents(
                    content.elements.timeSeries,
                    'tested_overall'
                  ),
                }}
              />
            )}
          </ChartTile>

          <ChoroplethTile
            title={replaceVariablesInText(text.map_titel, {
              municipality: gmName,
            })}
            description={text.map_toelichting}
            legend={{
              thresholds: gmThresholds.tested_overall.infected_per_100k,
              title:
                siteText.positief_geteste_personen.chloropleth_legenda.titel,
            }}
            metadata={{
              date: lastValue.date_unix,
              source: text.bronnen.rivm,
            }}
          >
            <GmChoropleth
              accessibility={{
                key: 'confirmed_cases_choropleth',
              }}
              selectedCode={data.code}
              data={choropleth.gm}
              getLink={reverseRouter.gm.positiefGetesteMensen}
              metricName="tested_overall"
              metricProperty="infected_per_100k"
              tooltipContent={(
                context: GmProperties & GmCollectionTestedOverall
              ) => <PositiveTestedPeopleGmTooltip context={context} />}
            />
          </ChoroplethTile>
        </TileList>
      </GmLayout>
    </Layout>
  );
};

export default PositivelyTestedPeople;
