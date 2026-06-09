// Config de Remotion (build/preview). Doc: https://www.remotion.dev/docs/config
import { Config } from "@remotion/cli/config";

Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
// H.264 con buena calidad para social/TV (CRF mas bajo = mas calidad).
Config.setCodec("h264");
Config.setCrf(18);
