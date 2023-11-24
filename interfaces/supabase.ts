export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      geocoding: {
        Row: {
          created_at: string
          id: string
          lead_id: string
          results: {
    address_components: {
      long_name: string;
      short_name: string;
      types: string[]
    }[]
    formatted_address: string;
    geometry: {
      bounds: {
        northeast: {
          lat: number;
          lng: number;
        }
        southwest: {
          lat: number;
          lng: number;
        }
      }
      location: {
        lat: number;
        lng: number;
      }
      location_type: string;
      viewport: {
        northeast: {
          lat: number;
          lng: number;
        }
        southwest: {
          lat: number;
          lng: number;
        }
      }
    }
    place_id: string;
    types: string[]
  }[]
          status: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          lead_id?: string
          results?: {
    address_components: {
      long_name: string;
      short_name: string;
      types: string[]
    }[]
    formatted_address: string;
    geometry: {
      bounds: {
        northeast: {
          lat: number;
          lng: number;
        }
        southwest: {
          lat: number;
          lng: number;
        }
      }
      location: {
        lat: number;
        lng: number;
      }
      location_type: string;
      viewport: {
        northeast: {
          lat: number;
          lng: number;
        }
        southwest: {
          lat: number;
          lng: number;
        }
      }
    }
    place_id: string;
    types: string[]
  }[]
          status?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          lead_id?: string
          results?: {
    address_components: {
      long_name: string;
      short_name: string;
      types: string[]
    }[]
    formatted_address: string;
    geometry: {
      bounds: {
        northeast: {
          lat: number;
          lng: number;
        }
        southwest: {
          lat: number;
          lng: number;
        }
      }
      location: {
        lat: number;
        lng: number;
      }
      location_type: string;
      viewport: {
        northeast: {
          lat: number;
          lng: number;
        }
        southwest: {
          lat: number;
          lng: number;
        }
      }
    }
    place_id: string;
    types: string[]
  }[]
          status?: string | null
        }
        Relationships: []
      }
      leads: {
        Row: {
          address: string
          created_at: string
          electricity_bill: number
          email: string
          id: string
          name: string
          phone: string
          installation: string
        }
        Insert: {
          id?: string
          created_at?: string
          address: string
          electricity_bill: number
          email: string
          name: string
          phone: string
          installation: string
        }
        Update: {
          address?: string
          created_at?: string
          electricity_bill?: number
          email?: string
          id?: string
          name?: string
          phone?: string
          installation?: string
        }
        Relationships: []
      }
      solar_data: {
        Row: {
          created_at: string
          id: string
          boundingBox: {
              sw: {
                latitude: number;
                longitude: number;
              };
              ne: {
                latitude: number;
                longitude: number;
              };
            }
          center: {
              latitude: number;
              longitude: number;
            }

          imageryDate: {
    year: number;
    month: number;
    day: number;
  }
          imageryProcessedDate: {
    year: number;
    month: number;
    day: number;
  }
          imageryQuality: string
          name: string
          regionCode: string
          solarPotential: {
    maxArrayPanelsCount: number;
    maxArrayAreaMeters2: number;
    maxSunshineHoursPerYear: number;
    carbonOffsetFactorKgPerMwh: number;
    wholeRoofStats: {
      areaMeters2: number;
      sunshineQuantiles: number[];
      groundAreaMeters2: number;
    };
    roofSegmentStats: {
      pitchDegrees: number;
      azimuthDegrees: number;
      stats: {
        areaMeters2: number;
        sunshineQuantiles: number[];
        groundAreaMeters2: number;
      };
      center: {
        latitude: number;
        longitude: number;
      };
      boundingBox: {
        sw: {
          latitude: number;
          longitude: number;
        };
        ne: {
          latitude: number;
          longitude: number;
        };
      };
      planeHeightAtCenterMeters: number;
    }[];
    solarPanelConfigs: {
      panelsCount: number;
      yearlyEnergyDcKwh: number;
      roofSegmentSummaries: {
        pitchDegrees: number;
        azimuthDegrees: number;
        panelsCount: number;
        yearlyEnergyDcKwh: number;
        segmentIndex: number;
      }[];
    }[];
    panelCapacityWatts: number;
    panelHeightMeters: number;
    panelWidthMeters: number;
    panelLifetimeYears: number;
    buildingStats: {
      areaMeters2: number;
      sunshineQuantiles: number[];
      groundAreaMeters2: number;
    };
    solarPanels: {
      center: {
        latitude: number;
        longitude: number;
      };
      orientation: string;
      yearlyEnergyDcKwh: number;
      segmentIndex: number;
    }[];
  }
        }
        Insert: {
          created_at?: string
          id?: string
          boundingBox?: {
                sw: {
                    latitude: number;
                    longitude: number;
                  };
                ne: {
                    latitude: number;
                    longitude: number;
                  };
              }
          center?: {
                latitude: number;
                longitude: number;
              }
          imageryDate: {
                year: number;
                month: number;
                day: number;
              }
          imageryProcessedDate: {
                year: number;
                month: number;
                day: number;
              }
          imageryQuality: string
          name: string
          regionCode: string
          solarPotential: {
            maxArrayPanelsCount: number;
            maxArrayAreaMeters2: number;
            maxSunshineHoursPerYear: number;
            carbonOffsetFactorKgPerMwh: number;
            wholeRoofStats: {
              areaMeters2: number;
              sunshineQuantiles: number[];
              groundAreaMeters2: number;
            };
            roofSegmentStats: {
              pitchDegrees: number;
              azimuthDegrees: number;
              stats: {
                areaMeters2: number;
                sunshineQuantiles: number[];
                groundAreaMeters2: number;
              };
              center: {
                latitude: number;
                longitude: number;
              };
              boundingBox: {
                sw: {
                  latitude: number;
                  longitude: number;
                };
                ne: {
                  latitude: number;
                  longitude: number;
                };
              };
              planeHeightAtCenterMeters: number;
            }[];
            solarPanelConfigs?: {
              panelsCount: number;
              yearlyEnergyDcKwh: number;
              roofSegmentSummaries: {
                pitchDegrees: number;
                azimuthDegrees: number;
                panelsCount: number;
                yearlyEnergyDcKwh: number;
                segmentIndex: number;
              }[];
            }[];
            panelCapacityWatts: number;
            panelHeightMeters: number;
            panelWidthMeters: number;
            panelLifetimeYears: number;
            buildingStats: {
              areaMeters2: number;
              sunshineQuantiles: number[];
              groundAreaMeters2: number;
            };
            solarPanels: {
              center: {
                latitude: number;
                longitude: number;
              };
              orientation: string;
              yearlyEnergyDcKwh: number;
              segmentIndex: number;
            }[];
          }
        }
        Update: {
          id?: string
          created_at?: string
          boundingBox?: Json
          center?: Json
          imageryDate?: Json
          imageryProcessedDate?: Json
          imageryQuality?: string
          name?: string
          regionCode?: string
          solarPotential?: Json
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
