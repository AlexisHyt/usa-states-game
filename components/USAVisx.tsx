/*
* Thanks to this codesandbox from Airbnb
* https://codesandbox.io/p/sandbox/github/airbnb/visx/tree/master/packages/visx-demo/src/sandboxes/visx-geo-albers-usa?file=%2Fusa-topo.d.ts
* */

import React from 'react';
import { AlbersUsa } from '@visx/geo';
import { geoCentroid } from '@visx/vendor/d3-geo';
import * as topojson from 'topojson-client';
import topology from '@/data/usa-topo.json';
import stateAbbrs from '@/data/us-abbr.json';
import {State} from "@/data/states";
import {GameStatus} from "@/components/StateGuessingGame";
import {getStateColor, selectedColor} from "@/lib/getStateColor";

interface Props {
  currentState: State;
  gameStatus: GameStatus;
  fullview?: boolean;
}
interface FeatureShape {
  type: 'Feature';
  id: string;
  geometry: { coordinates: [number, number][][]; type: 'Polygon' };
  properties: { name: string };
}

const { features: unitedStates } = topojson.feature(topology, topology.objects.states) as {
  type: 'FeatureCollection';
  features: FeatureShape[];
};

const background = '#EBF4F3';
const coordOffsets: Record<string, number[]> = {
  FL: [11, 3],
  AK: [0, -4],
  CA: [-7, 0],
  NY: [5, 0],
  MI: [13, 20],
  LA: [-10, -3],
  HI: [-10, 10],
  ID: [0, 10],
  WV: [-2, 4],
  KY: [10, 0],
  TN: [0, 4],
};
const ignoredStates = ['VT', 'NH', 'MA', 'RI', 'CT', 'NJ', 'DE', 'MD'];

export default function USAVisx({ currentState, gameStatus, fullview = false }: Props) {
  const height = 600;
  const width = height * 1.55;

  const centerX = width / 2;
  const centerY = height / 2;
  const scale = (width + height) / 1.55;

  return (
    <svg width={width} height={height} style={{ background, borderRadius: '14px' }}>
      <AlbersUsa<FeatureShape>
        data={unitedStates}
        scale={scale}
        translate={[centerX, centerY - 25]}
      >
        {({ features }) =>
          features.map(({ feature, path, projection }, i) => {
            const coords: [number, number] | null = projection(geoCentroid(feature));
            const abbr: string = stateAbbrs[feature.id as keyof typeof stateAbbrs];

            if (coordOffsets[abbr] && coords) {
              coords[0] += coordOffsets[abbr][0];
              coords[1] += coordOffsets[abbr][1];
            }

            const stylesObj = {
              fill: '#FFF',
              fontFamily: 'sans-serif',
              cursor: 'default',
            };

            if (abbr === 'HI') {
              stylesObj.fill = selectedColor;
            }

            if (ignoredStates.includes(abbr)) {
              return (
                <path
                  key={`map-feature-${i}`}
                  d={path || ''}
                  fill={getStateColor(currentState, gameStatus, abbr)}
                  stroke={background}
                  strokeWidth={0.5}
                />
              );
            }

            return (
              <React.Fragment key={`map-feature-${i}`}>
                <path
                  key={`map-feature-${i}`}
                  d={path || ''}
                  fill={getStateColor(currentState, gameStatus, abbr)}
                  stroke={background}
                  strokeWidth={0.5}
                />
                {(gameStatus !== 'playing' || fullview) && (
                  <>
                    <text
                      transform={`translate(${coords})`}
                      fontSize={Math.max(width / 75, 9)}
                      style={stylesObj}
                      textAnchor="middle"
                    >
                      {abbr}
                    </text>
                    {fullview && coords && (
                      <text
                        transform={`translate(${coords[0]}, ${coords[1] + 14})`}
                        fontSize={Math.max(width / 120, 7)}
                        style={stylesObj}
                        textAnchor="middle"
                      >
                        {feature.properties.name}
                      </text>
                    )}
                  </>
                )}
              </React.Fragment>
            );
          })
        }
      </AlbersUsa>
    </svg>
  );
}