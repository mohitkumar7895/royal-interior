import { create } from 'zustand';
import { RoofingSheetType, ShedCalculation } from '@/types';
import { ShedEstimatorModel } from '@/models/estimator.model';

interface EstimatorState {
  lengthFeet: number;
  widthFeet: number;
  heightFeet: number;
  roofType: RoofingSheetType;
  calculation: ShedCalculation;
  setDimensions: (length: number, width: number, height: number) => void;
  setRoofType: (type: RoofingSheetType) => void;
  resetEstimator: () => void;
}

const initialLength = 100;
const initialWidth = 50;
const initialHeight = 22;
const initialRoof: RoofingSheetType = 'color_coated_galvalume';

export const useEstimatorStore = create<EstimatorState>((set) => ({
  lengthFeet: initialLength,
  widthFeet: initialWidth,
  heightFeet: initialHeight,
  roofType: initialRoof,
  calculation: ShedEstimatorModel.calculate(initialLength, initialWidth, initialHeight, initialRoof),

  setDimensions: (length, width, height) => {
    set((state) => {
      const calc = ShedEstimatorModel.calculate(length, width, height, state.roofType);
      return { lengthFeet: length, widthFeet: width, heightFeet: height, calculation: calc };
    });
  },

  setRoofType: (roofType) => {
    set((state) => {
      const calc = ShedEstimatorModel.calculate(
        state.lengthFeet,
        state.widthFeet,
        state.heightFeet,
        roofType
      );
      return { roofType, calculation: calc };
    });
  },

  resetEstimator: () => {
    set({
      lengthFeet: initialLength,
      widthFeet: initialWidth,
      heightFeet: initialHeight,
      roofType: initialRoof,
      calculation: ShedEstimatorModel.calculate(
        initialLength,
        initialWidth,
        initialHeight,
        initialRoof
      ),
    });
  },
}));
