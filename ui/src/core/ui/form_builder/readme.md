# RESULT

```
{
  "name": \${NAME:string:""},
  "scene":{<SelectScene/>:OBJECT:{"bricks":{"base_feature":{"path":"bricks/base_feature"},"form":{"path":"bricks/form"}}}}
}
```

# CONTEXT

### хранит в себе type и enum для result

```
ENUM T = "ObjectDetection","PoseEstimation";
ENUM L = "POINT","SUN";

type MODELS = {
"name": \${NAME:string:""},
"model": \${MODEL:string:"models/1.fbx"}
};

type OBJECTS_SCENE = {
"name": \${NAME:string:""},
"loc_xyz": [\${TEST123:string:"test123"}, \${LOC_XYZ_2:number:0}, \${LOC_XYZ_3:number:0}],
};
```
