const regenerate = require('regenerate');

module.exports = {
  // $id: 'https://github.com/scripting/Scripting-News/tree/master/rss-in-json', // @TODO get a URI for this schema
  $schema: 'http://json-schema.org/schema#',
  title: 'RSS-in-JSON',
  type: 'object',
  properties: {
    rss: {
      type: 'object',
      properties: {
        version: {
          type: 'string',
          const: '2.0',
          description: 'the version of RSS the feed uses'
        },
        channel: {
          type: 'object',
          properties: {
            title: {
              type: 'string',
              description: 'the name of the channel'
            },
            link: {
              type: 'string',
              format: 'uri',
              description: 'the URL to the HTML website corresponding to the channel'
            },
            description: {
              type: 'string',
              description: 'phrase or sentence describing the channel'
            },
            language: {
              type: 'string',
              pattern: '^[A-Za-z]+(?:-[A-Za-z]+)?$',
              description: 'the language the channel is written in'
            },
            copyright: {
              type: 'string',
              description: 'copyright notice for content in the channel'
            },
            managingEditor: {
              type: 'string',
              description: 'email address for person responsible for editorial content'
            },
            webMaster: {
              type: 'string',
              description: 'email address for person responsible for technical issues relating to channel'
            },
            pubDate: {
              type: 'string',
              description: 'the publication date for the content in the channel, in RFC 822 format'
            },
            lastBuildDate: {
              type: 'string',
              description: 'the last time the content of the channel changed, in RFC 822 format'
            },
            category: {
              type: 'array',
              description: 'one or more categories that the channel belongs to',
              items: {
                $ref: '#/definitions/category'
              }
            },
            generator: {
              type: 'string',
              description: 'a string indicating the program used to generate the channel'
            },
            docs: {
              type: 'string',
              format: 'uri',
              description: 'a URL that points to the documentation for the format used in the RSS file'
            },
            cloud: {
              type: 'object',
              description: 'allows processes to register with a cloud to be notified of updates to the channel, implementing a lightweight publish-subscribe protocol for RSS feeds',
              properties: {
                domain: {
                  oneOf: [
                    {
                      type: 'string',
                      format: 'hostname',
                      description: 'the domain name of the cloud'
                    },
                    {
                      type: 'string',
                      format: 'ipv4',
                      description: 'the IP address of the cloud'
                    }
                  ]
                },
                port: {
                  type: 'integer',
                  description: 'the TCP port that the cloud is running on'
                },
                path: {
                  type: 'string',
                  description: 'the location of its responder'
                },
                registerProcedure: {
                  type: 'string',
                  description: 'the name of the procedure to call to request notification'
                },
                protocol: {
                  type: 'string',
                  enum: [ 'xml-rpc', 'soap', 'http-post' ],
                  description: 'which protocol to be used'
                }
              },
              required: [ 'domain', 'port', 'path', 'registerProcedure', 'protocol' ]
            },
            ttl: {
              type: 'number',
              description: 'ttl stands for time to live; a number of minutes that indicates how long a channel can be cached before refreshing from the source'
            },
            image: {
              description: 'a GIF, JPEG or PNG image that can be displayed with the channel',
              $ref: '#/definitions/image'
            },
            rating: {
              type: 'string',
              description: 'the PICS rating for the channel'
            },
            textInput: {
              type: 'object',
              description: 'a text input box that can be displayed with the channel',
              properties: {
                title: {
                  type: 'string',
                  description: 'the label of the Submit button in the text input area'
                },
                description: {
                  type: 'string',
                  description: 'explains the text input area'
                },
                name: {
                  type: 'string',
                  description: 'the name of the text object in the text input area'
                },
                link: {
                  type: 'string',
                  format: 'uri',
                  description: 'the URL of the CGI script that processes text input requests'
                }
              },
              required: [ 'title', 'description', 'name', 'link' ]
            },
            skipHours: {
              type: 'object',
              properties: {
                hour: {
                  type: 'array',
                  maxItems: 24,
                  uniqueItems: true,
                  description: 'each hour is a number between 0 and 23, representing a time in GMT, when aggregators, if they support the feature, may not read the channel',
                  items: {
                    type: 'integer',
                    minimum: 0,
                    maximum: 23
                  }
                }
              }
            },
            skipDays: {
              type: 'object',
              properties: {
                day: {
                  type: 'array',
                  maxItems: 7,
                  uniqueItems: true,
                  description: 'aggregators, if they support the feature, may not read the channel during the listed days',
                  items: {
                    type: 'string',
                    enum: [ 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday' ]
                  }
                }
              }
            },
            item: {
              type: 'array',
              items: {
                $ref: '#/definitions/item'
              }
            }
          },
          required: [ 'title', 'link', 'description' ]
        }
      },
      patternProperties: {
        [`^xmlns:${
          regenerate()
            .addRange('A', 'Z')
            .addRange('a', 'z')
            .add('_')
            .addRange(0xC0, 0xD6)
            .addRange(0xD8, 0xF6)
            .addRange(0xF8, 0x02FF)
            .addRange(0x0370, 0x037D)
            .addRange(0x037F, 0x1FFF)
            .addRange(0x200C, 0x200D)
            .addRange(0x2070, 0x218F)
            .addRange(0x2C00, 0x2FEF)
            .addRange(0x3001, 0xD7FF)
            .addRange(0xF900, 0xFDCF)
            .addRange(0xFDF0, 0xFFFD)
            .addRange(0x10000, 0xEFFFF)
            .add('-')
            .add('.')
            .addRange(0, 9)
            .add(0xB7)
            .addRange(0x0300, 0x036F)
            .addRange(0x203F, 0x2040)
            .toString()
        }+$`]: {
          type: 'string',
          format: 'uri'
        }
      },
      additionalProperties: false,
      required: [ 'version', 'channel' ]
    }
  },
  required: [ 'rss' ],
  definitions: {
    category: {
      oneOf: [
        {
          type: 'string'
        },
        {
          type: 'object',
          properties: {
            domain: {
              type: 'string',
              description: 'a string that identifies a categorization taxonomy'
            },
            '#value': {
              type: 'string'
            }
          },
          required: [ 'domain', '#value' ]
        }
      ]
    },
    image: {
      type: 'object',
      properties: {
        url: {
          type: 'string',
          format: 'uri',
          description: 'the URL of a GIF, JPEG or PNG image that represents the channel'
        },
        title: {
          type: 'string',
          description: 'describes the image and is used in the ALT attribute of the HTML <img> tag when the channel is rendered in HTML'
        },
        link: {
          type: 'string',
          format: 'uri',
          description: 'is the URL of the site, and when the channel is rendered, the image is a link to the site'
        },
        width: {
          type: 'integer',
          maximum: 144
        },
        height: {
          type: 'integer',
          maximum: 400
        },
        description: {
          type: 'string',
          description: 'text that is included in the TITLE attribute of the link formed around the image in the HTML rendering'
        }
      },
      required: [ 'url', 'title', 'link' ]
    },
    item: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
          description: 'the title of the item'
        },
        link: {
          type: 'string',
          format: 'uri',
          description: 'the URL of the item'
        },
        description: {
          type: 'string',
          description: 'the item synopsis'
        },
        author: {
          type: 'string',
          description: 'email address of the author of the item'
        },
        category: {
          type: 'array',
          description: 'includes the item in one or more categories',
          items: {
            $ref: '#/definitions/category'
          }
        },
        comments: {
          type: 'string',
          format: 'uri',
          description: 'URL of a page for comments relating to the item'
        },
        enclosure: {
          type: 'object',
          description: 'describes a media object that is attached to the item',
          properties: {
            url: {
              type: 'string',
              format: 'uri',
              description: 'where the enclosure is located'
            },
            length: {
              type: 'integer',
              description: 'how big it is in bytes'
            },
            type: {
              type: 'string',
              description: 'a standard MIME type'
            }
          },
          required: [ 'url', 'length', 'type' ]
        },
        guid: {
          oneOf: [
            {
              type: 'string',
              description: 'a string that uniquely identifies the item'
            },
            {
              type: 'object',
              properties: {
                isPermalink: {
                  type: 'boolean',
                  description: 'whether the reader may assume that the guid is a permalink to the item'
                },
                '#value': {
                  type: 'string',
                  description: 'a string that uniquely identifies the item'
                }
              },
              required: [ '#value' ]
            }
          ]
        },
        pubDate: {
          type: 'string',
          description: 'when the item was published, in RFC 822 format'
        },
        source: {
          type: 'object',
          properties: {
            url: {
              type: 'string',
              format: 'uri',
              description: 'link to the XMLization of the source'
            },
            '#value': {
              type: 'string',
              description: 'the name of the RSS channel that the item came from, derived from its <title>'
            }
          },
          required: [ 'url', '#value' ]
        }
      },
      anyOf: [
        { required: [ 'title' ] },
        { required: [ 'link' ] },
        { required: [ 'description' ] }
      ]
    }
  }
};
