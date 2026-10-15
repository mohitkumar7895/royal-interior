import { ShedCalculation, RoofingSheetType } from '@/types';

export class ShedEstimatorModel {
  static calculate(
    length: number,
    width: number,
    height: number,
    roofType: RoofingSheetType
  ): ShedCalculation {
    const floorAreaSqFt = Math.max(1, length * width);
    // Roof pitch adds roughly 10% extra area
    const roofAreaSqFt = Math.round(floorAreaSqFt * 1.1);

    // Rate calculations per sq ft based on industrial standards
    let sheetRate = 65; // standard GI tin
    if (roofType === 'color_coated_galvalume') sheetRate = 95;
    if (roofType === 'insulated_sandwich_panel') sheetRate = 165;
    if (roofType === 'polycarbonate_transparent') sheetRate = 120;

    // Heavy structural steel rate per sq ft (trusses, purlins, columns)
    const steelRate = height > 25 ? 160 : height > 18 ? 140 : 120;
    // Civil foundation bolts, anchor brackets, guttering & erection
    const civilErectionRate = 45;

    const steelStructureCost = floorAreaSqFt * steelRate;
    const roofingSheetCost = roofAreaSqFt * sheetRate;
    const erectionCivilCost = floorAreaSqFt * civilErectionRate;
    const totalEstimatedCost = steelStructureCost + roofingSheetCost + erectionCivilCost;
    const pricePerSqFt = Math.round(totalEstimatedCost / floorAreaSqFt);

    return {
      lengthFeet: length,
      widthFeet: width,
      heightFeet: height,
      roofType,
      floorAreaSqFt,
      roofAreaSqFt,
      steelStructureCost,
      roofingSheetCost,
      erectionCivilCost,
      totalEstimatedCost,
      pricePerSqFt,
    };
  }
}
