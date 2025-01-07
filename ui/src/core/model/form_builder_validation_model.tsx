import { IsNotEmpty, IsString } from "class-validator";

import { ValidationModel } from "./validation_model";

import makeAutoObservable from "mobx-store-inheritance";

export class FormBuilderValidationModel extends ValidationModel {
  @IsNotEmpty()
  @IsString()
  public result: string;
  @IsNotEmpty()
  @IsString()
  public context: string;
  public form: string[];
  public output: any;
  constructor(context: string, result: string, form: string[], output: string) {
    super();
    makeAutoObservable(this);
    this.context = context;
    this.result = result;
    this.form = form;
    this.output = output;
  }

  static isEmpty = (formBuilderValidationModel: FormBuilderValidationModel) =>
    formBuilderValidationModel.context.isEmpty() &&
    formBuilderValidationModel.result.isEmpty() &&
    formBuilderValidationModel.form.isEmpty();

  static creteDataSetTest = () =>
    new FormBuilderValidationModel(``, scene, [], "");
  static emptySimple = () =>
    new FormBuilderValidationModel("", simpleFormBuilder, [], "");
  static vision = () =>
    new FormBuilderValidationModel(
      `
      ENUM T = "ObjectDetection","PoseEstimation";
      ENUM L = "POINT","SUN";
      ENUM F = "JPEG","PNG";
      ENUM COLLISION_SHAPE = "BOX","COLLISION";

      type OBJECTS_SCENE = {
      "name": \${NAME:string:default},
      "collision_shape": \${collision_shape:Enum<COLLISION_SHAPE>:BOX},
      "loc_xyz": [\${LOC_XYZ_1:number:0}, \${LOC_XYZ_2:number:0}, \${LOC_XYZ_3:number:0}],
      "rot_euler": [\${ROT_EULER_1:number:0},\${ROT_EULER_2:number:0}, \${ROT_EULER_3:number:0}],
      "material_randomization": {
          "specular": [\${SPECULAR_1:number:0}, \${SPECULAR_2:number:1}],
          "roughness": [\${ROUGHNESS_1:number:0}, \${ROUGHNESS_2:number:1}],
          "metallic": [\${METALLIC_1:number:0}, \${METALLIC_2:number:1}],
          "base_color": [
              [
                  \${BASE_COLOR_1:number:0},
                  \${BASE_COLOR_2:number:0},
                  \${BASE_COLOR_3:number:0},
                  \${BASE_COLOR_4:number:1}
              ],
              [
                  \${BASE_COLOR_5:number:1},
                  \${BASE_COLOR_6:number:1},
                  \${BASE_COLOR_7:number:1},
                  \${BASE_COLOR_8:number:1}
              ]
          ]
      }
      };
      type LIGHTS = {
      "id": \${ID:number:1},
      "type": \${type:Enum<L>:POINT},
      "loc_xyz": [\${LOC_XYZ_1:number:5}, \${LOC_XYZ_2:number:5}, \${LOC_XYZ_3:number:5}],
      "rot_euler": [\${ROT_EULER_1:number:-0.06}, \${ROT_EULER_2:number:0.61}, \${ROT_EULER_3:number:-0.19}],
      "color_range_low": [\${COLOR_RANGE_LOW_1:number:0.5}, \${COLOR_RANGE_LOW_2:number:0.5}, \${COLOR_RANGE_LOW_3:number:0.5}],
      "color_range_high":[\${COLOR_RANGE_HIGH_1:number:1}, \${COLOR_RANGE_HIGH_2:number:1}, $\{COLOR_RANGE_HIGH_3:number:1}],
      "energy_range":[\${ENERGY_RANGE_1:number:400},\${ENERGY_RANGE_2:number:900}]
      };`,
      `
      {
        "process":\${<SelectProcess/>:OBJECT:{"type": "OBJECT_DETECTION"},
        "datasetObjects":\${<SelectDetail/>:OBJECT:{"details": []},
        "typedataset": \${typedataset:Enum<T>:ObjectDetection},
        "models_randomization":{
          "loc_range_low":  [\${LOC_RANGE_LOW_1:number:-1}, \${LOC_RANGE_LOW_2:number:-1},\${LOC_RANGE_LOW_3:number:0}],
          "loc_range_high": [\${LOC_RANGE_HIGH_1:number:1}, \${LOC_RANGE_HIGH_2:number:1},\${LOC_RANGE_HIGH_3:number:2}]
        },
        "scene":{
          "objects": \${OBJECTS_SCENE:Array<OBJECTS_SCENE>:[]},
          "lights": \${LIGHTS:Array<LIGHTS>:[]}
        },
        "camera_position":{
          "center_shell": [\${CENTER_SHELL_1:number:0}, \${CENTER_SHELL_2:number:0}, \${CENTER_SHELL_3:number:0}],
          "radius_range": [\${RADIUS_RANGE_1:number:1}, \${RADIUS_RANGE_2:number:1.4}],
          "elevation_range": [\${ELEVATION_RANGE_1:number:10}, \${ELEVATION_RANGE_2:number:90}]
        },
        "generation":{
          "n_cam_pose": \${N_CAM_POSE:number:5},
          "n_sample_on_pose": \${N_SAMPLE_ON_POSE:number:3},
          "n_series": \${N_SERIES:number:100},
          "image_format": \${image_format:Enum<F>:JPEG},
          "image_size_wh": [\${IMAGE_SIZE_WH_1:number:640}, \${IMAGE_SIZE_WH_2:number:480}]
        }
      }
      `,
      [],
      ""
    );
}
export const scene = `{ 
    "center_shell": [\${CENTER_SHELL_1:number:0}, \${CENTER_SHELL_2:number:0}, \${CENTER_SHELL_3:number:0}],
    "scene":\${<SelectScene/>:OBJECT:{"details": []}
  }`;
export const simpleFormBuilder = `{
    "center_shell": [\${CENTER_SHELL_1:number:0}, \${CENTER_SHELL_2:number:0}, \${CENTER_SHELL_3:number:0}]
}`;
export const ffContext = `type ITEM = {
  "name": \${NAME:string:default},
  "value": \${VALUE:string:default}
  };  
`;

export const ff1Result = `{
  "detailForm":\${<SelectDetail/>:OBJECT:{"details": []},
  "empty":\${NAME:string:default},
  "params": \${ITEM:Array<ITEM>:[]}
}`;
