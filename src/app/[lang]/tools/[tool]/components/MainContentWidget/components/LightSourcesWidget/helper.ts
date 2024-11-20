import { LightSourceProps } from "../LightSource/LightSource.types";
import { Camera, LightReplacementPrediction } from "@/services/openApi";

export const extractLights = (
    cameras?: Camera[] | null,
    predictions?: LightReplacementPrediction[] | null,
    options?: { maxLength?: number }
): LightSourceProps[] => {
    const allLights: LightSourceProps[] = [];

    if (!cameras || !predictions) return allLights;

    cameras.forEach(camera => {
        camera.lights?.forEach(light => {
            allLights.push({
                ...light,
                cameraName: camera.name,
                daysToReplacement: predictions.find(item => light.lightType === item.lightType)?.daysToReplacement
            });
        });
    });

    if (!!options?.maxLength) return allLights.slice(0, options?.maxLength);

    return allLights;
};
