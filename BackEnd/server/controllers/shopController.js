const errorHandler = require('../util/errorHandler');
const {
  bcrypt,
  jwt,
  jwtSecret,
  extractUserIDFromToken,
  validateEmail,
  validateProvider,
} = require('../util/common');

const model = require('../models/shopModel');

module.exports = {
  search: async (req, res) => {
    const itemsPerPage = 6;
    const itemsPerQuery = itemsPerPage + 1;
    const cursorStr = req.query.cursor;
    const cursor = cursorStr
      ? parseInt(Buffer.from(cursorStr, 'base64').toString('utf-8'))
      : 0;

    const {
      keyword = null,
      type,
      plug,
      wifi,
      smoking_area,
      cat,
      dog,
      min_order,
      no_time_limit,
    } = req.query;

    const userId =
      process.env.HAS_ACCOUNT === 'true' ? extractUserIDFromToken(req) : null;

    const result = await model.search(
      keyword,
      type,
      plug,
      wifi,
      smoking_area,
      cat,
      dog,
      min_order,
      no_time_limit,
      userId,
      cursor,
      itemsPerQuery,
    );

    let shopArr = [];
    for (let i = 0; i < itemsPerPage; i++) {
      if (result[i] === undefined) {
        break;
      }
      const obj = {
        id: result[i].id,
        name: result[i].shop_name,
        primary_image: result[i].primary_image,
        address: result[i].address,
        operating_status: result[i].operating_status,
        wishlist_item: result[i].wishlist_item,
        seats: JSON.parse(`[${result[i].seat_info}]`),
      };
      shopArr.push(obj);
    }

    if (result.length < itemsPerQuery) {
      res.status(200).json({ data: { shops: shopArr, next_cursor: null } });
    } else {
      const nextPageIndex = shopArr[shopArr.length - 1].id;
      let nextCursor = Buffer.from(nextPageIndex.toString()).toString('base64');
      res
        .status(200)
        .json({ data: { shops: shopArr, next_cursor: nextCursor } });
    }
  },
  getBasicInfo: async (req, res) => {
    const cafeId = req.params.id * 1;
    const cafeProfileExistence = await model.findPublishedCafeProfileById(
      cafeId,
    );
    console.log(cafeProfileExistence);
    if (!cafeProfileExistence) {
      return errorHandler.clientError(res, 'profileNotFound', 404);
    }
    let userId;
    if (process.env.HAS_ACCOUNT === 'true') {
      console.log('user has login');
      userId = extractUserIDFromToken(req);
    }
    const result = await model.getBasicInfo(cafeId, userId);
    const shopObj = {
      id: result[0].id,
      name: result[0].shop_name,
      type: result[0].type,
      nearest_MRT: result[0].nearst_MRT,
      wishlist_item: result[0].wishlist_item,
      introduction: result[0].introduction,
      opening_hour: result[0].opening_hour,
      closing_hour: result[0].closing_hour,
      primary_image: result[0].primary_image,
      secondary_image_1: result[0].secondary_image_1,
      secondary_image_2: result[0].secondary_image_2,
      address: result[0].address,
      telephone: result[0].telephone,
      facebook: result[0].facebook,
      ig: result[0].ig,
      line: result[0].line,
      rules: result[0].rules,
      service_and_equipment: result[0].service_and_equipment,
    };
    const menuObj = {
      menu: {
        last_updated: result[0].menu_last_updated,
        categories: [],
        items: [],
      },
    };
    for (let i = 0; i < result.length; i++) {
      menuObj.menu.categories.push(result[i].category);
    }
    for (let i = 0; i < result.length; i++) {
      const itemArr = result[i].menu_items.split(',');
      const itemObj = itemArr.map((el, index) => {
        const [name, price] = el.split('$');
        return {
          id: index + 1,
          name,
          price,
        };
      });
      menuObj.menu.items.push(itemObj);
    }
    res.status(200).json({ data: { shop: { ...shopObj, ...menuObj } } });
  },
  getCurrentStatus: async (req, res) => {
    const cafeId = req.params.id * 1;
    const result = await model.getCurrentStatus(cafeId);
    const statusObj = {
      last_update: result[0].status_last_updated,
      operating_status: result[0].operating_status,
      seats: [],
    };
    for (let i = 0; i < result.length; i++) {
      const obj = {
        icon: result[0].icon,
        type: result[0].type,
        available_seats: result[0].available_seats,
        total_seats: result[0].total_seats,
      };
      statusObj.seats.push(obj);
    }
    res.status(200).json({ data: { shop: { ...statusObj } } });
  },
  createComment: async (req, res) => {
    try {
      const customer_id = extractUserIDFromToken(req);
      const cafe_id = parseInt(req.params.cafe_id);
      const data = req.body;

      const {
        context,
        is_quiet,
        total_rating,
        cleanliness,
        service,
        food,
        wifi,
        atmosphere,
      } = data;

      if (!context || context.trim() == '') {
        return errorHandler.clientError(res, 'missingContent', 400);
      }

      try {
        const result = await model.createComment(
          context,
          cafe_id,
          customer_id,
          total_rating,
          cleanliness,
          service,
          food,
          wifi,
          atmosphere,
          is_quiet,
        );

        const responseData = {
          data: {
            cafe: {
              id: cafe_id,
            },
            comment: {
              id: result[0].insertId,
            },
          },
        };

        res.status(200).json(responseData);
      } catch (error) {
        console.log(error);
        errorHandler.serverError(res, error, 'sqlquery');
      }
    } catch (error) {
      errorHandler.serverError(res, error, 'internalServer');
    }
  },
  deleteComment: async (req, res) => {
    try {
      const comment_id = parseInt(req.params.comment_id);
      const commentExist = await model.checkCommentExist(comment_id);
      if (!commentExist) {
        return errorHandler.clientError(res, 'commentNotExist', 400);
      }
      try {
        await model.deleteComment(comment_id);

        const responseData = {
          data: {
            comment: {
              id: comment_id,
            },
          },
        };

        res.status(200).json(responseData);
      } catch (error) {
        errorHandler.serverError(res, error, 'sqlquery');
      }
    } catch (error) {
      errorHandler.serverError(res, error, 'internalServer');
    }
  },
  getComments: async (req, res) => {
    res.json(model.getComments());
  },
};
