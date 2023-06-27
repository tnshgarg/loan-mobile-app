export const parseUrl = (initialUrl) => {
    const splitted = initialUrl.split('/');
    const campaignType = splitted[3];
    let campaignScreen = "";
    let campaignId = null;
    if(splitted[4]?.toLowerCase() == "campaign") {
        campaignId = splitted[5]
    } else if (splitted[5]?.toLowerCase() == "campaign") {
        campaignScreen = splitted[4]
        campaignId = splitted[6]
    }
    return {campaignType,campaignScreen, campaignId}
}