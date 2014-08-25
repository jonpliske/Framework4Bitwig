// Written by Jürgen Moßgraber - mossgrabers.de
//            Michael Schmalle - teotigraphix.com
// (c) 2014
// Licensed under GPLv3 - http://www.gnu.org/licenses/gpl.html

function MidiOutput ()
{
    this.port = host.getMidiOutPort (0);
    this.queue = {};
    this.lastSent = {};
}

MidiOutput.prototype.sendCC = function (cc, value)
{
    var key = 'cc'+cc+1;

    if (this.lastSent[key] !== value) {
      this.port.sendMidi (0xB0, cc, value);
      this.lastSent[key] = value;
    }
};

MidiOutput.prototype.sendCCEx = function (channel, cc, value)
{
    var key = 'cc'+cc+channel;

    if (this.lastSent[key] !== value) {
      this.port.sendMidi (0xB0 + channel, cc, value);
      this.lastSent[key] = value;
    }
};

MidiOutput.prototype.sendNote = function (note, velocity)
{
    this.port.sendMidi (0x90, note, velocity);
};

MidiOutput.prototype.sendNoteEx = function (channel, note, velocity)
{
    this.port.sendMidi (0x90 + channel, note, velocity);
};

MidiOutput.prototype.sendSysex = function (data)
{
    this.port.sendSysex (data);
};
