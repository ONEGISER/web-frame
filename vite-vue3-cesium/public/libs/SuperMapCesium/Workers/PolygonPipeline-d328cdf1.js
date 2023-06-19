define(["exports","./earcut-2.2.1-20c8012f","./Cartesian2-47311507","./Cartographic-3309dd0d","./Check-7b2a090c","./ComponentDatatype-c140a87d","./when-b60132fc","./EllipsoidRhumbLine-ed1a6bf4","./GeometryAttribute-06a41648","./Math-119be1a3","./FeatureDetection-806b12f0","./WebGLConstants-4ae0db90"],(function(a,e,t,i,n,r,s,o,u,h,p,d){"use strict";var C={CLOCKWISE:d.WebGLConstants.CW,COUNTER_CLOCKWISE:d.WebGLConstants.CCW,NONE:d.WebGLConstants.NONE,validate:function(a){return a===C.CLOCKWISE||a===C.COUNTER_CLOCKWISE}},l=Object.freeze(C),m=new i.Cartesian3,c=new i.Cartesian3,y={computeArea2D:function(a){for(var e=a.length,t=0,i=e-1,n=0;n<e;i=n++){var r=a[i],s=a[n];t+=r.x*s.y-s.x*r.y}return.5*t},computeWindingOrder2D:function(a){return y.computeArea2D(a)>0?l.COUNTER_CLOCKWISE:l.CLOCKWISE},triangulate:function(a,i){var n=t.Cartesian2.packArray(a);return e.earcut(n,i,2)}},f=new i.Cartesian3,g=new i.Cartesian3,v=new i.Cartesian3,E=new i.Cartesian3,b=new i.Cartesian3,S=new i.Cartesian3,w=new i.Cartesian3;y.computeSubdivision=function(a,e,t,n,o){o=s.defaultValue(o,!1),n=s.defaultValue(n,h.CesiumMath.RADIANS_PER_DEGREE);var d,C=t.slice(0),l=e.length,m=new Array(3*l),c=0;for(d=0;d<l;d++){var y=e[d];m[c++]=y.x,m[c++]=y.y,m[c++]=y.z}for(var A=[],x={},L=a.maximumRadius,R=h.CesiumMath.chordLength(n,L),M=R*R;C.length>0;){var D,G,O=C.pop(),W=C.pop(),T=C.pop(),z=i.Cartesian3.fromArray(m,3*T,f),N=i.Cartesian3.fromArray(m,3*W,g),P=i.Cartesian3.fromArray(m,3*O,v),I=o?z:i.Cartesian3.multiplyByScalar(i.Cartesian3.normalize(z,E),L,E),B=o?N:i.Cartesian3.multiplyByScalar(i.Cartesian3.normalize(N,b),L,b),U=o?P:i.Cartesian3.multiplyByScalar(i.Cartesian3.normalize(P,S),L,S),_=i.Cartesian3.magnitudeSquared(i.Cartesian3.subtract(I,B,w)),K=i.Cartesian3.magnitudeSquared(i.Cartesian3.subtract(B,U,w)),V=i.Cartesian3.magnitudeSquared(i.Cartesian3.subtract(U,I,w)),F=Math.max(_,K,V);F>M?_===F?(d=x[D=Math.min(T,W)+" "+Math.max(T,W)],s.defined(d)||(G=i.Cartesian3.add(z,N,w),i.Cartesian3.multiplyByScalar(G,.5,G),m.push(G.x,G.y,G.z),d=m.length/3-1,x[D]=d),C.push(T,d,O),C.push(d,W,O)):K===F?(d=x[D=Math.min(W,O)+" "+Math.max(W,O)],s.defined(d)||(G=i.Cartesian3.add(N,P,w),i.Cartesian3.multiplyByScalar(G,.5,G),m.push(G.x,G.y,G.z),d=m.length/3-1,x[D]=d),C.push(W,d,T),C.push(d,O,T)):V===F&&(d=x[D=Math.min(O,T)+" "+Math.max(O,T)],s.defined(d)||(G=i.Cartesian3.add(P,z,w),i.Cartesian3.multiplyByScalar(G,.5,G),m.push(G.x,G.y,G.z),d=m.length/3-1,x[D]=d),C.push(O,d,W),C.push(d,T,W)):(A.push(T),A.push(W),A.push(O))}return new u.Geometry({attributes:{position:new u.GeometryAttribute({componentDatatype:r.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:m})},indices:A,primitiveType:p.PrimitiveType.TRIANGLES})};var A=new i.Cartographic,x=new i.Cartographic,L=new i.Cartographic,R=new i.Cartographic;y.computeRhumbLineSubdivision=function(a,e,t,n){n=s.defaultValue(n,h.CesiumMath.RADIANS_PER_DEGREE);var d,C=t.slice(0),l=e.length,m=new Array(3*l),c=0;for(d=0;d<l;d++){var y=e[d];m[c++]=y.x,m[c++]=y.y,m[c++]=y.z}for(var E=[],b={},S=a.maximumRadius,M=h.CesiumMath.chordLength(n,S),D=new o.EllipsoidRhumbLine(void 0,void 0,a),G=new o.EllipsoidRhumbLine(void 0,void 0,a),O=new o.EllipsoidRhumbLine(void 0,void 0,a);C.length>0;){var W=C.pop(),T=C.pop(),z=C.pop(),N=i.Cartesian3.fromArray(m,3*z,f),P=i.Cartesian3.fromArray(m,3*T,g),I=i.Cartesian3.fromArray(m,3*W,v),B=a.cartesianToCartographic(N,A),U=a.cartesianToCartographic(P,x),_=a.cartesianToCartographic(I,L);D.setEndPoints(B,U);var K=D.surfaceDistance;G.setEndPoints(U,_);var V=G.surfaceDistance;O.setEndPoints(_,B);var F,q,k,j,H=O.surfaceDistance,J=Math.max(K,V,H);J>M?K===J?(d=b[F=Math.min(z,T)+" "+Math.max(z,T)],s.defined(d)||(q=D.interpolateUsingFraction(.5,R),k=.5*(B.height+U.height),j=i.Cartesian3.fromRadians(q.longitude,q.latitude,k,a,w),m.push(j.x,j.y,j.z),d=m.length/3-1,b[F]=d),C.push(z,d,W),C.push(d,T,W)):V===J?(d=b[F=Math.min(T,W)+" "+Math.max(T,W)],s.defined(d)||(q=G.interpolateUsingFraction(.5,R),k=.5*(U.height+_.height),j=i.Cartesian3.fromRadians(q.longitude,q.latitude,k,a,w),m.push(j.x,j.y,j.z),d=m.length/3-1,b[F]=d),C.push(T,d,z),C.push(d,W,z)):H===J&&(d=b[F=Math.min(W,z)+" "+Math.max(W,z)],s.defined(d)||(q=O.interpolateUsingFraction(.5,R),k=.5*(_.height+B.height),j=i.Cartesian3.fromRadians(q.longitude,q.latitude,k,a,w),m.push(j.x,j.y,j.z),d=m.length/3-1,b[F]=d),C.push(W,d,T),C.push(d,z,T)):(E.push(z),E.push(T),E.push(W))}return new u.Geometry({attributes:{position:new u.GeometryAttribute({componentDatatype:r.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:m})},indices:E,primitiveType:p.PrimitiveType.TRIANGLES})},y.scaleToGeodeticHeight=function(a,e,n,r){n=s.defaultValue(n,t.Ellipsoid.WGS84);var o=m,u=c;if(e=s.defaultValue(e,0),r=s.defaultValue(r,!0),s.defined(a))for(var h=a.length,p=0;p<h;p+=3)i.Cartesian3.fromArray(a,p,u),r&&(u=n.scaleToGeodeticSurface(u,u)),0!==e&&(o=n.geodeticSurfaceNormal(u,o),i.Cartesian3.multiplyByScalar(o,e,o),i.Cartesian3.add(u,o,u)),a[p]=u.x,a[p+1]=u.y,a[p+2]=u.z;return a},a.PolygonPipeline=y,a.WindingOrder=l}));
