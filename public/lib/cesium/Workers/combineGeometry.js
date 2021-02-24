/**
 * Cesium - https://github.com/CesiumGS/cesium
 *
 * Copyright 2011-2020 Cesium Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Columbus View (Pat. Pend.)
 *
 * Portions licensed separately.
 * See https://github.com/CesiumGS/cesium/blob/master/LICENSE.md for full licensing details.
 */

define(['./PrimitivePipeline-780d65f5', './createTaskProcessorWorker', './Transforms-c00dcfdd', './Cartesian2-15709417', './Check-6c0211bc', './when-54c2dc71', './Math-fbfbe3b1', './RuntimeError-2109023a', './ComponentDatatype-a26dd044', './WebGLConstants-76bb35d1', './GeometryAttribute-c2f3a6a0', './GeometryAttributes-4fcfcf40', './GeometryPipeline-31fd0b9c', './AttributeCompression-42df7d39', './EncodedCartesian3-8590615c', './IndexDatatype-eaebd63b', './IntersectionTests-9d9af9db', './Plane-ff99a7c3', './WebMercatorProjection-0e9a0efb'], function (PrimitivePipeline, createTaskProcessorWorker, Transforms, Cartesian2, Check, when, _Math, RuntimeError, ComponentDatatype, WebGLConstants, GeometryAttribute, GeometryAttributes, GeometryPipeline, AttributeCompression, EncodedCartesian3, IndexDatatype, IntersectionTests, Plane, WebMercatorProjection) { 'use strict';

  function combineGeometry(packedParameters, transferableObjects) {
    var parameters = PrimitivePipeline.PrimitivePipeline.unpackCombineGeometryParameters(
      packedParameters
    );
    var results = PrimitivePipeline.PrimitivePipeline.combineGeometry(parameters);
    return PrimitivePipeline.PrimitivePipeline.packCombineGeometryResults(
      results,
      transferableObjects
    );
  }
  var combineGeometry$1 = createTaskProcessorWorker(combineGeometry);

  return combineGeometry$1;

});
//# sourceMappingURL=combineGeometry.js.map
