import { Icon as TIcon } from '@corona-dashboard/icons';
import {
  Box,
  Button,
  Dialog,
  Flex,
  Grid,
  Heading,
  Radio,
  Stack,
  studioTheme,
  Text,
  ThemeProvider,
} from '@sanity/ui';
import { PatchEvent, set, unset } from 'part:@sanity/form-builder/patch-event';
import React, { useCallback, useState } from 'react';
import { RestrictionIconKey, restrictionIcons } from './restriction-icons';

function createPatchFrom(value: string) {
  return PatchEvent.from(value === '' ? unset() : set(value));
}
interface RestrictionIconInputProps {
  type: {
    title: string;
    description: string;
  };
  value: RestrictionIconKey;
  onChange: (event: PatchEvent) => void;
}
export function RestrictionIconInput(props: RestrictionIconInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = useCallback(() => setIsOpen(false), []);
  const onOpen = useCallback(() => setIsOpen(true), []);

  const { type, value, onChange } = props;

  var allIcons = Object.entries(restrictionIcons)
    // hide empty icons
    .filter((entry) => entry[1]) as [string, TIcon][];

  const TheIcon = restrictionIcons[value] as TIcon;

  return (
    <ThemeProvider theme={studioTheme}>
      <Stack space={3}>
        <Heading as="div" size={0}>
          {type.title}
        </Heading>
        {value === undefined ? (
          <Text>Er is geen icoon geselecteerd</Text>
        ) : (
          <Box>
            <TheIcon />
          </Box>
        )}

        <Box>
          <Button onClick={onOpen} text="Verander icoon" />
        </Box>
      </Stack>
      {isOpen && (
        <Dialog
          header="Kies een icoon"
          id="dialog-example"
          onClose={onClose}
          zOffset={1000}
        >
          <Box padding={4}>
            <Grid columns={[4, 6]} gap={[1, 1, 2, 3]}>
              {allIcons.map(([id, GridIcon]) => (
                <Flex
                  key={id}
                  direction="column"
                  align="center"
                  onClick={() => onChange(createPatchFrom(id))}
                >
                  <GridIcon />
                  <Radio checked={value === id} readOnly />
                </Flex>
              ))}

              <Flex
                direction="column"
                align="center"
                onClick={() => onChange(createPatchFrom(''))}
              >
                <span>Geen icoon</span>
                <Radio checked={value === undefined} readOnly />
              </Flex>
            </Grid>
          </Box>
        </Dialog>
      )}
    </ThemeProvider>
  );
}
