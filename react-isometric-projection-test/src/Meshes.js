import { meshLib } from 'react-isometric-projection';
const { Group, Rect, Pyramid, jsxTagToObj } = meshLib;

/** @jsx jsxTagToObj **/

export default {
  RED_CUBE: ({ position: p, dimensions: d }) => (
    <Group scale={d} position={p}>
      <Rect
        position="0 0 0"
        dimensions="1 1 1"
        colors={['#A00', '#B00', '#C00']}
      />
    </Group>
  ),
  GRASS: ({ position: p, dimensions: d }) => (
    <Group scale={d} position={p}>
      <Rect
        position="0 0 0"
        dimensions="1 0 1"
        colors={['#0A0']}
      />
    </Group>
  ),
  TREE: ({ position: p, dimensions: d }) => (
    <Group scale={d} position={p}>
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
          '.875 1 .125',
          '.875 1 .875'
        ]}
        colors={['#050', '#050', '#060', '#058000', '#050']}
      />
    </Group>
  ),
  PYRAMID: ({ position: p, dimensions: d }) => (
    <Group scale={d} position={p}>
      <Pyramid
        tipPoint="0.5 1 0.5"
        basePoints={[
          '0 0 0',
          '0 0 1',
          '1 0 0',
          '1 0 1'
        ]}
        colors={['#DD0', '#DC0', '#DB0', '#DA0', '#D90']}
      />
    </Group>
  )
}