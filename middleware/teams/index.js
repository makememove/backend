const getTeams = require('./getTeams');
const getTeam = require('./getTeam');
const createTeam = require('./createTeam');
const joinTeam = require('./joinTeam');
const leaveTeam = require('./leaveTeam');
const deleteTeam = require('./deleteTeam');

module.exports = {
    getTeams,
    getTeam,
    createTeam,
    joinTeam,
    leaveTeam,
    deleteTeam
};
