export default {
  RED_CUBE: `(
    <Group dimensions="0 0 0" viewBoxDimensions="1 1 1">
      <Rect position="0 0 0" dimensions="1 0.5 1" colors={['#f00', '#e00', '#d00']} />
    </Group>
)`,
  GRASS: `(
    <Group dimensions="0 0 0" viewBoxDimensions="1 1 1">
      <Rect
        position="0 0 0"
        dimensions="1 0 1"
        colors={['#0A0']}
      />
    </Group>
)`,
  TREE: `(
    <Group dimensions="0 0 0" viewBoxDimensions="2 2 2">
      <Rect
        position=".375 0 .375"
        dimensions=".25 1 .25"
        colors={['#420', '#420', '#301A00']}
      />
      <Pyramid
        tipPoint=".5 3 .5"
        basePoints={[
          '.125 1 .125',
          '.125 1 .875',
          '.875 1 .875',
          '.875 1 .125'
        ]}
        colors={['#050', '#050', '#060', '#058000', '#050']}
      />
    </Group>
)`,
  PYRAMID: `(
    <Group dimensions="0 0 0" viewBoxDimensions="1 1 1">
      <Pyramid
        tipPoint="0.5 1 0.5"
        basePoints={[
          '0 0 0',
          '0 0 1',
          '1 0 1',
          '1 0 0'
        ]}
        colors={['#DD0', '#DC0', '#DB0', '#DA0', '#D90']}
      />
    </Group>
)`
};
