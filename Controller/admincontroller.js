const { getConnection } = require('../Config/dbconnection');

async function createEmployee(req, res) {
  try {
    console.log('Request body:', req.body);

    const { ID, NAME, DEPARTMENT, DESIGNATION, PROJECT, EMPLOYEE_TYPE, EMPLOYEE_STATUS } =
      req.body;
    if (
      !ID ||
      !NAME ||
      !DEPARTMENT ||
      !DESIGNATION ||
      !EMPLOYEE_TYPE ||
      !EMPLOYEE_STATUS
    ) {
      return res.status(400).json({
        success: false,
        message: 'Please give a rquired field',
      });
    }

    const sql = `INSERT INTO employees (ID,NAME,DEPARTMENT,DESIGNATION,PROJECT,EMPLOYEE_TYPE,EMPLOYEE_STATUS)
      VALUES(?,?,?,?,?,?,?)`;
    const values = [
      ID,
      NAME,
      DEPARTMENT,
      DESIGNATION,
      PROJECT,
      EMPLOYEE_TYPE,
      EMPLOYEE_STATUS || null,
    ];

    // console.log(sql);
    // console.log(values);
    const [result, fields] = await getConnection().query(sql, values);

    // console.log(result);

    if (result) {
      return res.status(200).json({
        sucess: true,
        message: 'employee created successfully',
        employeeId: ID,
      });
    }
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(404).json({
        success: false,
        message: 'employee Id already creadted',
      });
    }

    console.log(error);
    return res.status(500).json({
      sucess: false,
      message: 'something went wrong cannot create empolyee',
    });
  }
}

async function getAllEmployee(req, res) {
  try {
    const [result] = await getConnection().query(`SELECT * FROM employees`);

    if (result.length > 0) {
      return res.status(200).json({
        sucess: true,
        message: 'fetched all employee successfully',
        data: result,
      });
    } else {
      return res.status(404).json({
        sucess: false,
        message: 'no employess founded',
        data: [],
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      sucess: false,
      message: 'something cannot wrong cannot fetch employee details',
    });
  }
}

async function getEmployeeId(req, res) {
  try {
    const [result] = await getConnection().query(
      `SELECT * FROM employees WHERE ID LIKE ${req.params.id}`
    );

    if (!result) {
      return res.status(404).json({
        success: false,
        message: 'employee not found',
        data: result,
      });
    }

    if (result) {
      return res.status(200).json({
        success: true,
        message: 'employee details fetched successfull',
        data: result,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'something wrong cannot get employee detail',
    });
  }
}

async function searchEmployee(req, res) {
  try {
    const { keyword } = req.query;
    if (!keyword || keyword.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'please provided a keyword',
      });
    }

    const searchTerm = `%${keyword}%`;

    const [result] = await getConnection().query(
      `SELECT * FROM employees WHERE ID LIKE ? OR DEPARTMENT LIKE ? OR NAME LIKE ?  
        OR DESIGNATION LIKE ? OR PROJECT LIKE ? OR EMPLOYEE_TYPE LIKE ? OR  EMPLOYEE_STATUS LIKE ?`,
      [searchTerm, searchTerm, searchTerm, searchTerm, searchTerm, searchTerm, searchTerm]
    );

    if (result.length > 0) {
      res.status(200).json({
        success: true,
        message: 'search results found',
        data: result,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'no employees found matching your search',
        data: [],
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'something wrong while searching',
      error: error.message,
    });
  }
}

async function editEmployee(req, res) {
  try {
    const employeeId = req.params.id;

    const { ID, NAME, DEPARTMENT, DESIGNATION, PROJECT, EMPLOYEE_TYPE, EMPLOYEE_STATUS } =
      req.body;

    if (!employeeId || isNaN(employeeId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or missing employee ID',
      });
    }
    if (
      (!ID, !NAME, !DEPARTMENT, !DESIGNATION, !PROJECT, !EMPLOYEE_STATUS, !EMPLOYEE_TYPE)
    ) {
      return res.status(404).json({
        success: false,
        message: 'Please provided atlease one field to update',
      });
    }

    let values = [];
    let setClauses = [];

    if (ID) {
      setClauses.push('ID = ?');
      values.push(ID);
    }

    if (NAME) {
      setClauses.push('NAME = ?');
      values.push(NAME);
    }
    if (DEPARTMENT) {
      setClauses.push('DEPARTMENT = ?');
      values.push(DEPARTMENT);
    }
    if (DESIGNATION) {
      setClauses.push('DESIGNATION = ?');
      values.push(DESIGNATION);
    }
    if (PROJECT) {
      setClauses.push('PROJECT = ?');
      values.push(PROJECT);
    }
    if (EMPLOYEE_TYPE) {
      setClauses.push('EMPLOYEE_TYPE = ?');
      values.push(EMPLOYEE_TYPE);
    }
    if (EMPLOYEE_STATUS) {
      setClauses.push('EMPLOYEE_STATUS = ?');
      values.push(EMPLOYEE_STATUS);
    }

    const query = ` UPDATE employees SET ${setClauses.join(', ')}  WHERE ID = ? `;
    values.push(employeeId);

    const [result] = await getConnection().query(query, values);

    console.log(result);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        mesage: 'empolyee not found',
      });
    }

    if (result) {
      return res.status(200).json({
        success: true,
        message: 'updated successfully',
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'something wrong updating employee details',
    });
  }
}

async function deleteEmployee(req, res) {
  try {
    const employeeId = req.params.id;

    if (!employeeId) {
      return res.status(400).json({
        success: false,
        message: 'Invaild employee id',
      });
    }

    const [result] = await getConnection().query(
      `DELETE  FROM employees WHERE  ID = ? `,
      [employeeId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: 'employee  not found',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'successfully deleted',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'something wrong  cannot deleted',
    });
  }
}

module.exports = {
  createEmployee,
  getAllEmployee,
  getEmployeeId,
  searchEmployee,
  editEmployee,
  deleteEmployee,
};
