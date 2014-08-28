// Written by J�rgen Mo�graber - mossgrabers.de
//            Michael Schmalle - teotigraphix.com
// (c) 2014
// Licensed under GPLv3 - http://www.gnu.org/licenses/gpl.html

AbstractDisplay.FORMAT_RAW   = 0;
AbstractDisplay.FORMAT_VALUE = 1;
AbstractDisplay.FORMAT_PAN   = 2;


function AbstractDisplay (output, noOfLines, noOfBlocks, noOfCells)
{
    if (typeof (output) == 'undefined')
        return;

    this.output = output;

    this.noOfLines  = noOfLines;
    this.noOfBlocks = noOfBlocks;
    this.noOfCells  = noOfCells;

    this.currentMessage = []; //initArray (null, this.noOfLines);
    this.message = [];// initArray (null, this.noOfLines);
    this.cells = [];// initArray (null, this.noOfLines * this.noOfCells);
}

//////////////////////////////////////////////////
// Abstract methods - need to be implemented

AbstractDisplay.prototype.clearCell = function (row, cell) {};

AbstractDisplay.prototype.setBlock = function (row, block, value) {};
AbstractDisplay.prototype.setCell = function (row, cell, value, format) {};

AbstractDisplay.prototype.writeLine = function (row, text) {};


//////////////////////////////////////////////////
// Public methods

AbstractDisplay.prototype.clear = function ()
{
    for (var i = 0; i < this.noOfLines; i++)
        this.clearRow (i);
    return this;
};

AbstractDisplay.prototype.clearRow = function (row)
{
    for (var i = 0; i < 4; i++)
        this.clearBlock (row, i);
    return this;
};

AbstractDisplay.prototype.clearBlock = function (row, block)
{
    var cell = 2 * block;
    this.clearCell (row, cell);
    this.clearCell (row, cell + 1);
    return this;
};

AbstractDisplay.prototype.clearColumn = function (column)
{
    for (var i = 0; i < this.noOfLines; i++)
        this.clearBlock (i, column);
    return this;
};

AbstractDisplay.prototype.setRow = function (row, str)
{
    this.message[row] = str;
    return this;
};

AbstractDisplay.prototype.done = function (row)
{
    var index = row * this.noOfCells;
    this.message[row] = '';
    for (var i = 0; i < this.noOfCells; i++)
        this.message[row] += this.cells[index + i];
    return this;
};

AbstractDisplay.prototype.allDone = function ()
{
    for (var row = 0; row < this.noOfLines; row++)
        this.done (row);
    return this;
};

AbstractDisplay.prototype.flush = function (row)
{
    log('flush');
    for (var row = 0; row < this.noOfLines; row++)
    {
        // Has anything changed?
        if (this.currentMessage[row] == this.message[row]) {
            log('row', row, 'unchanged');
            continue;
        }

        this.currentMessage[row] = this.message[row];

        if (this.currentMessage[row] != null){
            log('row', row, 'write:', this.currentMessage[row]);
            this.writeLine (row, this.currentMessage[row]);
        }
    }
};

AbstractDisplay.prototype.reverseStr = function (str)
{
    var r = '';
    for (var i = 0; i < str.length; i++)
        r = str[i] + r;
    return r;
};
