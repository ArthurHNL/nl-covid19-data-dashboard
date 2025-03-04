import {
  assert,
  colors,
  GmCollectionVaccineCoveragePerAgeGroup,
  VrCollectionVaccineCoveragePerAgeGroup,
} from '@corona-dashboard/common';
import css from '@styled-system/css';
import { useMemo, useState } from 'react';
import { hasValueAtKey, isDefined } from 'ts-is-present';
import { Box } from '~/components/base';
import { RegionControlOption } from '~/components/chart-region-controls';
import { DynamicChoropleth } from '~/components/choropleth';
import { ChoroplethTile } from '~/components/choropleth-tile';
import { thresholds } from '~/components/choropleth/logic';
import {
  TooltipContent,
  TooltipSubject,
} from '~/components/choropleth/tooltips';
import { TooltipData } from '~/components/choropleth/tooltips/types';
import { Markdown } from '~/components/markdown';
import { InlineText, Text } from '~/components/typography';
import { useIntl } from '~/intl';
import { replaceVariablesInText } from '~/utils/replace-variables-in-text';
import { useReverseRouter } from '~/utils/use-reverse-router';
import { AgeGroup, AgeGroupSelect } from './components/age-group-select';
import {
  CoverageKindProperty,
  VaccinationCoverageKindSelect,
} from './components/vaccination-coverage-kind-select';
import {
  KeyWithLabel,
  useVaccineCoveragePercentageFormatter,
} from './logic/use-vaccine-coverage-percentage-formatter';

interface VaccineCoverageChoroplethPerGmProps {
  data: {
    gm: GmCollectionVaccineCoveragePerAgeGroup[];
    vr: VrCollectionVaccineCoveragePerAgeGroup[];
  };
}

export function VaccineCoverageChoroplethPerGm({
  data,
}: VaccineCoverageChoroplethPerGmProps) {
  const { siteText } = useIntl();
  const [selectedMap, setSelectedMap] = useState<RegionControlOption>('gm');
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<AgeGroup>('18+');
  const [selectedCoverageKind, setSelectedCoverageKind] =
    useState<CoverageKindProperty>('has_one_shot_percentage');
  const reverseRouter = useReverseRouter();

  const variables = {
    regio:
      siteText.vaccinaties.choropleth_vaccination_coverage.shared[selectedMap],
  };

  return (
    <ChoroplethTile
      title={replaceVariablesInText(
        siteText.vaccinaties.choropleth_vaccination_coverage.nl.title,
        variables
      )}
      description={
        <>
          <Markdown
            content={replaceVariablesInText(
              siteText.vaccinaties.choropleth_vaccination_coverage.nl
                .description,
              variables
            )}
          />
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="flex-start"
            spacingHorizontal={2}
            as={'fieldset'}
          >
            <Text
              as="legend"
              fontWeight="bold"
              css={css({
                flexBasis: '100%',
                mb: 2,
              })}
            >
              {
                siteText.vaccinaties.choropleth_vaccination_coverage.shared
                  .dropdowns_title
              }
            </Text>

            <Box
              display="flex"
              width="100%"
              spacingHorizontal={{ xs: 2 }}
              flexWrap="wrap"
              flexDirection={{ _: 'column', xs: 'row' }}
            >
              <Box flex="1">
                <AgeGroupSelect onChange={setSelectedAgeGroup} />
              </Box>

              <Box flex="1">
                <VaccinationCoverageKindSelect
                  onChange={setSelectedCoverageKind}
                  initialValue={selectedCoverageKind}
                />
              </Box>
            </Box>
          </Box>
        </>
      }
      legend={{
        thresholds: thresholds.gm.fully_vaccinated_percentage,
        title:
          siteText.vaccinaties.choropleth_vaccination_coverage.shared
            .legend_title,
      }}
      metadata={{
        source: siteText.vaccinaties.vaccination_coverage.bronnen.rivm,
        date: data[selectedMap][0].date_unix,
      }}
      chartRegion={selectedMap}
      onChartRegionChange={setSelectedMap}
    >
      {selectedMap === 'gm' && (
        <DynamicChoropleth
          map={'gm'}
          accessibility={{ key: 'vaccine_coverage_nl_choropleth' }}
          data={data.gm.filter(
            hasValueAtKey('age_group_range', selectedAgeGroup)
          )}
          dataConfig={{
            metricName: 'vaccine_coverage_per_age_group',
            metricProperty: selectedCoverageKind,
          }}
          dataOptions={{
            isPercentage: true,
            getLink: (gmcode) => reverseRouter.gm.vaccinaties(gmcode),
            tooltipVariables: {
              age_group: siteText.vaccinaties.age_groups[selectedAgeGroup],
            },
          }}
          formatTooltip={(context) => (
            <ChoroplethTooltip
              data={context}
              percentageProps={[
                'fully_vaccinated_percentage',
                'has_one_shot_percentage',
              ]}
            />
          )}
        />
      )}

      {selectedMap === 'vr' && (
        <DynamicChoropleth
          map={'vr'}
          accessibility={{ key: 'vaccine_coverage_nl_choropleth' }}
          data={data.vr.filter(
            hasValueAtKey('age_group_range', selectedAgeGroup)
          )}
          dataConfig={{
            metricName: 'vaccine_coverage_per_age_group',
            metricProperty: selectedCoverageKind,
          }}
          dataOptions={{
            isPercentage: true,
            getLink: (vrcode) => reverseRouter.vr.vaccinaties(vrcode),
            tooltipVariables: {
              age_group: siteText.vaccinaties.age_groups[selectedAgeGroup],
            },
          }}
          formatTooltip={(context) => (
            <ChoroplethTooltip
              data={context}
              percentageProps={[
                'fully_vaccinated_percentage',
                'has_one_shot_percentage',
              ]}
            />
          )}
        />
      )}
    </ChoroplethTile>
  );
}

type VaccineCoverageData =
  | GmCollectionVaccineCoveragePerAgeGroup
  | VrCollectionVaccineCoveragePerAgeGroup;

type ChoroplethTooltipProps<T extends VaccineCoverageData> = {
  data: TooltipData<T>;
  percentageProps: KeyWithLabel<VaccineCoverageData>[];
};

export function ChoroplethTooltip<T extends VaccineCoverageData>(
  props: ChoroplethTooltipProps<T>
) {
  const { data, percentageProps } = props;

  assert(
    percentageProps.indexOf(
      data.dataConfig
        .metricProperty as unknown as KeyWithLabel<VaccineCoverageData>
    ) >= 0,
    `The given metricProperty ${data.dataConfig.metricProperty} is not found in percentageProps`
  );

  const { siteText } = useIntl();
  const text = siteText.choropleth_tooltip;
  const formatCoveragePercentage = useVaccineCoveragePercentageFormatter();
  const coverageData = data.dataItem as VaccineCoverageData;

  const formattedValues = useMemo(
    () =>
      Object.fromEntries(
        percentageProps.map((prop) => [
          prop,
          formatCoveragePercentage(coverageData, prop),
        ])
      ),
    [coverageData, percentageProps, formatCoveragePercentage]
  );

  const { [data.dataConfig.metricProperty]: mainValue, ...secondaryValues } =
    formattedValues;

  const subject = (
    text as unknown as Record<string, Record<string, Record<string, string>>>
  )[data.map]?.[data.dataConfig.metricProperty as string]?.subject;
  assert(
    isDefined(subject),
    `No tooltip subject found in siteText.choropleth_tooltip.${data.map}.${data.dataConfig.metricProperty}`
  );

  const tooltipVars = {
    ...data.dataItem,
    ...data.dataOptions.tooltipVariables,
  } as Record<string, string | number>;

  const filterBelow = data.dataItem[data.dataConfig.metricProperty] || null;

  const mainContent = (
    text as unknown as Record<string, Record<string, Record<string, string>>>
  )[data.map]?.[data.dataConfig.metricProperty as string]?.content;
  assert(
    isDefined(mainContent),
    `No tooltip content found in siteText.choropleth_tooltip.${data.map}.${data.dataConfig.metricProperty}`
  );

  const secondaryContent = Object.entries(secondaryValues).map(
    ([property, formattedValue]) => {
      const content = (
        text as unknown as Record<
          string,
          Record<string, Record<string, string>>
        >
      )[data.map]?.[property as string]?.content;
      assert(
        isDefined(content),
        `No tooltip content found in siteText.choropleth_tooltip.${data.map}.${property}`
      );
      return (
        <Box
          spacingHorizontal={2}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mr={13}
          pr={2}
          key={property}
        >
          <Markdown content={replaceVariablesInText(content, tooltipVars)} />
          <InlineText>{formattedValue as string}</InlineText>
        </Box>
      );
    }
  );

  return (
    <TooltipContent
      title={data.featureName}
      link={
        data.dataOptions.getLink
          ? data.dataOptions.getLink(data.code)
          : undefined
      }
    >
      <TooltipSubject
        subject={replaceVariablesInText(subject, tooltipVars)}
        thresholdValues={data.thresholdValues}
        filterBelow={filterBelow}
        noDataFillColor={colors.choroplethNoData}
      >
        <Box
          flexGrow={1}
          spacingHorizontal={2}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
          <Markdown
            content={replaceVariablesInText(mainContent, tooltipVars)}
          />
          <InlineText fontWeight="bold">{mainValue}</InlineText>
        </Box>
      </TooltipSubject>
      {secondaryContent}
    </TooltipContent>
  );
}
