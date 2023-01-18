import axios from 'axios'

const graphQLClient = axios.create({
  baseURL: 'https://wp.thoanny.fr/graphql',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
});

const limit = 10;

export default {
  async getPosts(next, previous) {
    let first = limit;
    let last = 0;

    if (previous) {
      first = 0;
      last = limit;
    }

    const res = await graphQLClient({
      method: 'post',
      data: {
        query: `
          query Posts {
            posts(where: {status: PUBLISH}, first: ${first}, after: "${next}", last: ${last}, before: "${previous}") {
              nodes {
                id
                slug
                title
                date
                excerpt
                featuredImage {
                    node {
                      altText
                      mediaDetails {
                          sizes(include: MEDIUM_LARGE) {
                            height
                            width
                            sourceUrl
                          }
                      }
                    }
                }
                categories {
                    nodes {
                      name
                    }
                }
                commentCount
              }
              pageInfo {
                hasNextPage
                hasPreviousPage
                startCursor
                endCursor
              }
            }
          }
      `
      }
    });

    if (res.data.data.posts) {
      return { posts: res.data.data.posts.nodes, pageInfo: res.data.data.posts.pageInfo };
    }

    return null;
  },
  async getPost(slug) {
    const res = await graphQLClient({
      method: 'post',
      data: {
        query: `
        query Post {
          post(id: "${slug}", idType: SLUG) {
            databaseId
            title
            excerpt
            content
            date
            featuredImage {
              node {
                altText
                mediaDetails {
                  sizes(include: LARGE) {
                    height
                    width
                    sourceUrl
                  }
                  height
                  width
                }
                mediaItemUrl
                caption
              }
            }
            categories {
              nodes {
                id
                name
                slug
              }
            }
            tags {
              nodes {
                id
                name
                slug
              }
            }
            author {
              node {
                avatar {
                  url
                }
                name
                description
              }
            }
            commentStatus
            commentCount
            comments(where: {orderby: COMMENT_DATE, order: ASC, parentIn: "null"}) {
              nodes {
                date
                content
                author {
                  node {
                    avatar {
                      url
                    }
                    name
                  }
                }
                replies {
                  nodes {
                    date
                    content
                    author {
                      node {
                        avatar {
                          url
                        }
                        name
                      }
                    }
                  }
                }
              }
            }      
          }
        }
        `
      }
    });

    if (res.data.data.post) {
      return res.data.data.post;
    }

    return null;
  },
  async getPostsByCategory(category, next, previous) {
    let first = limit;
    let last = 0;

    if (previous) {
      first = 0;
      last = limit;
    }

    const res = await graphQLClient({
      method: 'post',
      data: {
        query: `
          query Posts {
            category(id: "${category}", idType: SLUG) {
              name
              posts(where: {status: PUBLISH}, first: ${first}, after: "${next}", last: ${last}, before: "${previous}") {
                nodes {
                  slug
                  title
                  date
                  excerpt
                  featuredImage {
                    node {
                      altText
                      mediaDetails {
                        sizes(include: MEDIUM_LARGE) {
                          height
                          width
                          sourceUrl
                        }
                      }
                    }
                  }
                  categories {
                    nodes {
                      name
                    }
                  }
                  commentCount
                }
                pageInfo {
                  hasNextPage
                  hasPreviousPage
                  startCursor
                  endCursor
                }
              }
            }
          }
        `
      }
    });

    return { category: res.data.data.category.name, posts: res.data.data.category.posts.nodes, pageInfo: res.data.data.category.posts.pageInfo };
  },
  async getPostsByTag(tag, next, previous) {
    let first = limit;
    let last = 0;

    if (previous) {
      first = 0;
      last = limit;
    }

    const res = await graphQLClient({
      method: 'post',
      data: {
        query: `
          query Posts {
            tag(id: "${tag}", idType: SLUG) {
              name
              posts(where: {status: PUBLISH}, first: ${first}, after: "${next}", last: ${last}, before: "${previous}") {
                nodes {
                  slug
                  title
                  date
                  excerpt
                  featuredImage {
                    node {
                      altText
                      mediaDetails {
                        sizes(include: MEDIUM_LARGE) {
                          height
                          width
                          sourceUrl
                        }
                      }
                    }
                  }
                  categories {
                    nodes {
                      name
                    }
                  }
                  commentCount
                }
                pageInfo {
                  hasNextPage
                  hasPreviousPage
                  startCursor
                  endCursor
                }
              }
            }
          }
        `
      }
    });

    return { tag: res.data.data.tag.name, posts: res.data.data.tag.posts.nodes, pageInfo: res.data.data.tag.posts.pageInfo };
  }
}