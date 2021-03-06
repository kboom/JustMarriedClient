/* global describe, beforeEach, afterEach, it */
import {
  normalizeWedding,
  denormalizeWedding,
} from '../../../main/core/normalization/wedding.normalizer';
import { expect } from 'chai';

describe('wedding (de)normalization', () => {

  it('should normalize wedding', () => {
    expect(normalizeWedding({
      id: '58972e823b87a6696c40ab8a',
      guests: [
        {
          firstName: 'Mateusz',
          lastName: 'Machowicz',
          id: '58972e823b87a6696c40ab8c',
        },
        {
          firstName: 'Agata',
          lastName: 'Machowicz',
          id: '58972e823b87a6696c40ab8b',
        },
      ],
      participants: [
        {
          role: 'groom',
          active: true,
          user: {
            username: 'ggurgul',
            firstName: 'Grzegorz',
            lastName: 'Gurgul',
            id: '58972c7e3b87a6696c40ab83',
          },
          id: '58972e823b87a6696c40ab8f',
        },
        {
          role: 'bride',
          active: true,
          user: {
            username: 'anowakiewicz',
            firstName: 'Agata',
            lastName: 'Nowakiewicz',
            id: '58972c993b87a6696c40ab86',
          },
          id: '58972e823b87a6696c40ab8d',
        },
      ],
      owners: [
        {
          id: '58972c7e3b87a6696c40ab83',
          username: 'ggurgul',
          firstName: 'Grzegorz',
          lastName: 'Gurgul',
        },
      ],
    })).to.be.deep.eql({
      entities: {
        weddings: {
          '58972e823b87a6696c40ab8a': {
            guests: [
              '58972e823b87a6696c40ab8c',
              '58972e823b87a6696c40ab8b',
            ],
            id: '58972e823b87a6696c40ab8a',
            owners: [
              '58972c7e3b87a6696c40ab83',
            ],
            participants: [
              '58972e823b87a6696c40ab8f',
              '58972e823b87a6696c40ab8d',
            ],
          },
        },
        guests: {
          '58972e823b87a6696c40ab8b': {
            firstName: 'Agata',
            id: '58972e823b87a6696c40ab8b',
            lastName: 'Machowicz',
          },
          '58972e823b87a6696c40ab8c': {
            firstName: 'Mateusz',
            id: '58972e823b87a6696c40ab8c',
            lastName: 'Machowicz',
          },
        },
        participants: {
          '58972e823b87a6696c40ab8d': {
            active: true,
            id: '58972e823b87a6696c40ab8d',
            role: 'bride',
            user: '58972c993b87a6696c40ab86',
          },
          '58972e823b87a6696c40ab8f': {
            active: true,
            id: '58972e823b87a6696c40ab8f',
            role: 'groom',
            user: '58972c7e3b87a6696c40ab83',
          },
        },
        users: {
          '58972c7e3b87a6696c40ab83': {
            firstName: 'Grzegorz',
            id: '58972c7e3b87a6696c40ab83',
            lastName: 'Gurgul',
            username: 'ggurgul',
          },
          '58972c993b87a6696c40ab86': {
            firstName: 'Agata',
            id: '58972c993b87a6696c40ab86',
            lastName: 'Nowakiewicz',
            username: 'anowakiewicz',
          },
        },
      },
      result: '58972e823b87a6696c40ab8a',
    });
  });

  it('should denormalize wedding', () => {
    expect(denormalizeWedding({
      guests: [
        '58972e823b87a6696c40ab8c',
        '58972e823b87a6696c40ab8b',
      ],
      id: '58972e823b87a6696c40ab8a',
      owners: [
        '58972c7e3b87a6696c40ab83',
      ],
      participants: [
        '58972e823b87a6696c40ab8f',
        '58972e823b87a6696c40ab8d',
      ],
    }, {
      weddings: {
        '58972e823b87a6696c40ab8a': {
          guests: [
            '58972e823b87a6696c40ab8c',
            '58972e823b87a6696c40ab8b',
          ],
          id: '58972e823b87a6696c40ab8a',
          owners: [
            '58972c7e3b87a6696c40ab83',
          ],
          participants: [
            '58972e823b87a6696c40ab8f',
            '58972e823b87a6696c40ab8d',
          ],
        },
      },
      guests: {
        '58972e823b87a6696c40ab8b': {
          firstName: 'Agata',
          id: '58972e823b87a6696c40ab8b',
          lastName: 'Machowicz',
        },
        '58972e823b87a6696c40ab8c': {
          firstName: 'Mateusz',
          id: '58972e823b87a6696c40ab8c',
          lastName: 'Machowicz',
        },
      },
      participants: {
        '58972e823b87a6696c40ab8d': {
          active: true,
          id: '58972e823b87a6696c40ab8d',
          role: 'bride',
          user: '58972c993b87a6696c40ab86',
        },
        '58972e823b87a6696c40ab8f': {
          active: true,
          id: '58972e823b87a6696c40ab8f',
          role: 'groom',
          user: '58972c7e3b87a6696c40ab83',
        },
      },
      users: {
        '58972c7e3b87a6696c40ab83': {
          firstName: 'Grzegorz',
          id: '58972c7e3b87a6696c40ab83',
          lastName: 'Gurgul',
          username: 'ggurgul',
        },
        '58972c993b87a6696c40ab86': {
          firstName: 'Agata',
          id: '58972c993b87a6696c40ab86',
          lastName: 'Nowakiewicz',
          username: 'anowakiewicz',
        },
      },
    })).to.be.deep.eql({
      id: '58972e823b87a6696c40ab8a',
      guests: [
        {
          firstName: 'Mateusz',
          lastName: 'Machowicz',
          id: '58972e823b87a6696c40ab8c',
        },
        {
          firstName: 'Agata',
          lastName: 'Machowicz',
          id: '58972e823b87a6696c40ab8b',
        },
      ],
      participants: [
        {
          role: 'groom',
          active: true,
          user: {
            username: 'ggurgul',
            firstName: 'Grzegorz',
            lastName: 'Gurgul',
            id: '58972c7e3b87a6696c40ab83',
          },
          id: '58972e823b87a6696c40ab8f',
        },
        {
          role: 'bride',
          active: true,
          user: {
            username: 'anowakiewicz',
            firstName: 'Agata',
            lastName: 'Nowakiewicz',
            id: '58972c993b87a6696c40ab86',
          },
          id: '58972e823b87a6696c40ab8d',
        },
      ],
      owners: [
        {
          id: '58972c7e3b87a6696c40ab83',
          username: 'ggurgul',
          firstName: 'Grzegorz',
          lastName: 'Gurgul',
        },
      ],
    });
  });

});
