import { lazy, Suspense, useContext } from "react";

import { SettingsContext, DispatchContext } from "./context/SettingsContext";
import Close from "@material-ui/icons/Close";

import "./styles/AdvancedSettings.css";

const OutlineSettings = lazy(() => import("./OutlineSettings"));
const AutoRotate = lazy(() => import("./AutoRotate"));
const MaterialSettings = lazy(() => import("./MaterialSettings"));
const LightSettings = lazy(() => import("./LightSettings"));
const AsciiSettings = lazy(() => import("./AsciiSettings"));

function AdvancedSettings({ openControl }) {
    const dispatch = useContext(DispatchContext);
    const {
        model: { materialType },
    } = useContext(SettingsContext);

    const close = () => {
        const action = {
            type: "update",
            key: "app",
            value: { sideContent: "settings" },
        };
        dispatch(action);
    };

    return (
        <div className="AdvancedSettings">
            <div className="AdvancedSettings-header">
                <div className="AdvancedSettings-title">Advanced Settings</div>
                <div className="AdvancedSettings-close" onClick={close}>
                    <Close />
                </div>
            </div>
            <div className="AdvancedSettings-List">
                <Suspense fallback={<div>Loading</div>}>
                    <AutoRotate openAtStart />
                </Suspense>
                <Suspense fallback={<div>Loading</div>}>
                    <OutlineSettings openControl={openControl} />
                </Suspense>
                {materialType !== "Basic" && (
                    <Suspense fallback={<div>Loading</div>}>
                        <LightSettings openControl={openControl} />
                    </Suspense>
                )}
                <Suspense fallback={<div>Loading</div>}>
                    <MaterialSettings openControl={openControl} />
                </Suspense>
                <Suspense fallback={<div>Loading</div>}>
                    <AsciiSettings openControl={openControl} />
                </Suspense>
            </div>
        </div>
    );
}

export default AdvancedSettings;
