import { setGlobalOptions } from "firebase-functions/v2";

// Each v2 function reserves Cloud Run CPU for maxInstances (default 100); the regional CPU quota is shared by all functions
setGlobalOptions({ maxInstances: 10 });
