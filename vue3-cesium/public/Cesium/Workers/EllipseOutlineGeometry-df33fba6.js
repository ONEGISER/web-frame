define(["exports","./GeometryOffsetAttribute-03006e80","./Transforms-1142ce48","./Cartesian2-08065eec","./ComponentDatatype-a867ddaa","./when-ad3237a0","./Check-be2d5acb","./EllipseGeometryLibrary-002b2f96","./GeometryAttribute-da891979","./GeometryAttributes-27dc652d","./IndexDatatype-9504f550","./Math-5ca9b250"],function(e,c,f,m,h,y,t,b,A,_,g,x){"use strict";var E=new m.Cartesian3,s=new m.Cartesian3;var v=new f.BoundingSphere,M=new f.BoundingSphere;function C(e){var t=(e=y.defaultValue(e,y.defaultValue.EMPTY_OBJECT)).center,i=y.defaultValue(e.ellipsoid,m.Ellipsoid.WGS84),r=e.semiMajorAxis,a=e.semiMinorAxis,n=y.defaultValue(e.granularity,x.CesiumMath.RADIANS_PER_DEGREE),o=y.defaultValue(e.height,0),s=y.defaultValue(e.extrudedHeight,o);this._center=m.Cartesian3.clone(t),this._semiMajorAxis=r,this._semiMinorAxis=a,this._ellipsoid=m.Ellipsoid.clone(i),this._rotation=y.defaultValue(e.rotation,0),this._height=Math.max(s,o),this._granularity=n,this._extrudedHeight=Math.min(s,o),this._numberOfVerticalLines=Math.max(y.defaultValue(e.numberOfVerticalLines,16),0),this._offsetAttribute=e.offsetAttribute,this._workerName="createEllipseOutlineGeometry"}C.packedLength=m.Cartesian3.packedLength+m.Ellipsoid.packedLength+8,C.pack=function(e,t,i){return i=y.defaultValue(i,0),m.Cartesian3.pack(e._center,t,i),i+=m.Cartesian3.packedLength,m.Ellipsoid.pack(e._ellipsoid,t,i),i+=m.Ellipsoid.packedLength,t[i++]=e._semiMajorAxis,t[i++]=e._semiMinorAxis,t[i++]=e._rotation,t[i++]=e._height,t[i++]=e._granularity,t[i++]=e._extrudedHeight,t[i++]=e._numberOfVerticalLines,t[i]=y.defaultValue(e._offsetAttribute,-1),t};var G=new m.Cartesian3,L=new m.Ellipsoid,O={center:G,ellipsoid:L,semiMajorAxis:void 0,semiMinorAxis:void 0,rotation:void 0,height:void 0,granularity:void 0,extrudedHeight:void 0,numberOfVerticalLines:void 0,offsetAttribute:void 0};C.unpack=function(e,t,i){t=y.defaultValue(t,0);var r=m.Cartesian3.unpack(e,t,G);t+=m.Cartesian3.packedLength;var a=m.Ellipsoid.unpack(e,t,L);t+=m.Ellipsoid.packedLength;var n=e[t++],o=e[t++],s=e[t++],u=e[t++],l=e[t++],d=e[t++],p=e[t++],t=e[t];return y.defined(i)?(i._center=m.Cartesian3.clone(r,i._center),i._ellipsoid=m.Ellipsoid.clone(a,i._ellipsoid),i._semiMajorAxis=n,i._semiMinorAxis=o,i._rotation=s,i._height=u,i._granularity=l,i._extrudedHeight=d,i._numberOfVerticalLines=p,i._offsetAttribute=-1===t?void 0:t,i):(O.height=u,O.extrudedHeight=d,O.granularity=l,O.rotation=s,O.semiMajorAxis=n,O.semiMinorAxis=o,O.numberOfVerticalLines=p,O.offsetAttribute=-1===t?void 0:t,new C(O))},C.createGeometry=function(e){if(!(e._semiMajorAxis<=0||e._semiMinorAxis<=0)){var t=e._height,i=e._extrudedHeight,r=!x.CesiumMath.equalsEpsilon(t,i,0,x.CesiumMath.EPSILON2);e._center=e._ellipsoid.scaleToGeodeticSurface(e._center,e._center);var a,t={center:e._center,semiMajorAxis:e._semiMajorAxis,semiMinorAxis:e._semiMinorAxis,ellipsoid:e._ellipsoid,rotation:e._rotation,height:t,granularity:e._granularity,numberOfVerticalLines:e._numberOfVerticalLines};return r?(t.extrudedHeight=i,t.offsetAttribute=e._offsetAttribute,a=function(e){var t=e.center,i=e.ellipsoid,r=e.semiMajorAxis,a=m.Cartesian3.multiplyByScalar(i.geodeticSurfaceNormal(t,E),e.height,E);v.center=m.Cartesian3.add(t,a,v.center),v.radius=r,a=m.Cartesian3.multiplyByScalar(i.geodeticSurfaceNormal(t,a),e.extrudedHeight,a),M.center=m.Cartesian3.add(t,a,M.center),M.radius=r;var t=b.EllipseGeometryLibrary.computeEllipsePositions(e,!1,!0).outerPositions,t=(a=new _.GeometryAttributes({position:new A.GeometryAttribute({componentDatatype:h.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:b.EllipseGeometryLibrary.raisePositionsToHeight(t,e,!0)})})).position.values,r=f.BoundingSphere.union(v,M),n=t.length/3;y.defined(e.offsetAttribute)&&(o=new Uint8Array(n),o=e.offsetAttribute===c.GeometryOffsetAttribute.TOP?c.arrayFill(o,1,0,n/2):(t=e.offsetAttribute===c.GeometryOffsetAttribute.NONE?0:1,c.arrayFill(o,t)),a.applyOffset=new A.GeometryAttribute({componentDatatype:h.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:o}));var o=y.defaultValue(e.numberOfVerticalLines,16),o=x.CesiumMath.clamp(o,0,n/2),s=g.IndexDatatype.createTypedArray(n,2*n+2*o);n/=2;var u=0;for(p=0;p<n;++p)s[u++]=p,s[u++]=(p+1)%n,s[u++]=p+n,s[u++]=(p+1)%n+n;if(0<o)for(var e=Math.min(o,n),l=Math.round(n/e),d=Math.min(l*o,n),p=0;p<d;p+=l)s[u++]=p,s[u++]=p+n;return{boundingSphere:r,attributes:a,indices:s}}(t)):(a=function(e){var t=e.center;s=m.Cartesian3.multiplyByScalar(e.ellipsoid.geodeticSurfaceNormal(t,s),e.height,s),s=m.Cartesian3.add(t,s,s);for(var i=new f.BoundingSphere(s,e.semiMajorAxis),t=b.EllipseGeometryLibrary.computeEllipsePositions(e,!1,!0).outerPositions,e=new _.GeometryAttributes({position:new A.GeometryAttribute({componentDatatype:h.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:b.EllipseGeometryLibrary.raisePositionsToHeight(t,e,!1)})}),r=t.length/3,a=g.IndexDatatype.createTypedArray(r,2*r),n=0,o=0;o<r;++o)a[n++]=o,a[n++]=(o+1)%r;return{boundingSphere:i,attributes:e,indices:a}}(t),y.defined(e._offsetAttribute)&&(i=a.attributes.position.values.length,t=new Uint8Array(i/3),i=e._offsetAttribute===c.GeometryOffsetAttribute.NONE?0:1,c.arrayFill(t,i),a.attributes.applyOffset=new A.GeometryAttribute({componentDatatype:h.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:t}))),new A.Geometry({attributes:a.attributes,indices:a.indices,primitiveType:A.PrimitiveType.LINES,boundingSphere:a.boundingSphere,offsetAttribute:e._offsetAttribute})}},e.EllipseOutlineGeometry=C});
