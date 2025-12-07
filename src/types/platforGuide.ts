import {IAppConfig, ISubscriptionPageAppConfig, TPlatform} from "@/types/appList";


export interface IPlatformGuideProps {
    getAppsForPlatform: (platform: TPlatform) => IAppConfig[]
    getSelectedAppForPlatform: (platform: TPlatform) => IAppConfig | null
    openDeepLink: (urlScheme: string, isNeedBase64Encoding: boolean | undefined, useRedirect: boolean | undefined) => void
    appsConfig: ISubscriptionPageAppConfig['platforms']
}
