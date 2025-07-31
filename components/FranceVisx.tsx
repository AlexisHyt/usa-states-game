/*
* Based on the USAVisx component
*/

import React from 'react';
import { Mercator } from '@visx/geo';
import { geoCentroid } from '@visx/vendor/d3-geo';
import topology from '@/data/france-topo.json';
import {Department} from "@/data/departments";
import {GameStatus} from "@/components/DepartmentGuessingGame";
import {getDepartmentColor, selectedColor} from "@/lib/getDepartmentColor";
import {GeoPermissibleObjects} from "d3-geo";

interface Props {
  currentDepartment: Department;
  gameStatus: GameStatus;
  fullview?: boolean;
}

interface FranceTopology {
  type: 'FeatureCollection';
  features: FeatureShape[];
}

interface FeatureShape {
  type: 'Feature';
  geometry: { 
    type: 'Polygon';
    coordinates: [number, number][][];
  };
  properties: { 
    code: string;
    nom: string;
  };
}

// Directly use the GeoJSON features from the france-topo.json file
const franceDepartments = (topology as unknown as FranceTopology).features;

const background = '#EBF4F3';
const coordOffsets: Record<string, number[]> = {
  // Add offsets for specific departments if needed
  "75": [0, 0], // Paris
  "2A": [0, 0], // Corse-du-Sud
  "2B": [0, 0], // Haute-Corse
};

export default function FranceVisx({ currentDepartment, gameStatus, fullview = false }: Props) {
  const height = 600;
  const width = height * 0.9;

  const centerX = width / 2;
  const centerY = height / 2;
  const scale = (width + height) * 1.7;

  return (
    <svg width={width} height={height} style={{ background, borderRadius: '14px' }}>
      <Mercator<FeatureShape>
        data={franceDepartments}
        scale={scale}
        translate={[centerX, centerY]}
        center={[2.8, 46.8]} // Approximate center of France
      >
        {({ features }) =>
          features.map(({ feature, path, projection }, i) => {
            const coords: [number, number] | null = projection(geoCentroid(feature));
            const code: string = feature.properties.code;

            if (coordOffsets[code] && coords) {
              coords[0] += coordOffsets[code][0];
              coords[1] += coordOffsets[code][1];
            }

            const stylesObj = {
              fill: '#FFF',
              fontFamily: 'sans-serif',
              cursor: 'default',
            };
            
            if (code === "75") {
              stylesObj.fill = selectedColor;
            }

            return (
              <React.Fragment key={`map-feature-${i}`}>
                <path
                  key={`map-feature-${i}`}
                  d={path || ''}
                  fill={getDepartmentColor(currentDepartment, gameStatus, code)}
                  stroke={background}
                  strokeWidth={0.5}
                />
                {(gameStatus !== 'playing' || fullview) && coords && (
                  <>
                    <text
                      transform={`translate(${coords})`}
                      fontSize={Math.max(width / 100, 8)}
                      style={stylesObj}
                      textAnchor="middle"
                    >
                      {code}
                    </text>
                    {fullview && (
                      <text
                        transform={`translate(${coords[0]}, ${coords[1] + 12})`}
                        fontSize={Math.max(width / 150, 6)}
                        style={stylesObj}
                        textAnchor="middle"
                      >
                        {feature.properties.nom}
                      </text>
                    )}
                  </>
                )}
              </React.Fragment>
            );
          })
        }
      </Mercator>
    </svg>
  );
}