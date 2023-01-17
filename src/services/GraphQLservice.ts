import axios from 'axios'

const graphQLClient = axios.create({
  baseURL: 'https://wp.thoanny.fr/graphql',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  async getPosts() {
    const res = await graphQLClient({
      method: 'post',
      data: {
        query: `
          query Posts {
              posts(where: {status: PUBLISH}) {
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
              }
          }
      `
      }
    });

    if (res.data.data.posts) {
      return res.data.data.posts.nodes;
    }

    return null;
  },
  async getPost(slug: String) {
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
  async getPostsByCategory(category: String) {
    const res = await graphQLClient({
      method: 'post',
      data: {
        query: `
                query Posts {
                    category(id: "${category}", idType: SLUG) {
                      name
                      posts {
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
                      }
                    }
                  }
                `
      }
    });

    return res.data.data.category;
  },
  async getPostsByTag(tag: String) {
    const res = await graphQLClient({
      method: 'post',
      data: {
        query: `
              query Posts {
                tag(id: "${tag}", idType: SLUG) {
                  name
                  posts {
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
                  }
                }
              }
              `
      }
    });

    return res.data.data.tag;
  }
}