import { Light } from "@/services/openApi";

export interface LightSourceProps extends Light {
    cameraName?: string | null;
    daysToReplacement?: number;
}
