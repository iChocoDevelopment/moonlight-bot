function checkPerms(message) {
    if (
        message.member.roles.cache.some(role => role.name === 'Admin') ||
        message.member.roles.cache.some(role => role.name === 'Owner')||
        message.member.roles.cache.some(role => role.name === 'Chocolatin')||
        message.member.roles.cache.some(role => role.name === 'LunarPerms')
    ) {
        return true;
    } else {
        return false;
    }
}
module.exports = checkPerms