from flask import Blueprint, render_template, request

colleges = Blueprint('colleges', __name__, static_folder="static", template_folder="templates")

from app.models.collegesModel import Colleges

colleges_model = Colleges()
@colleges.route('/')
def show_colleges():
    colleges = colleges_model.get_colleges()
    return render_template('college.html', colleges=colleges)



@colleges.route('/addcollege', methods=['POST'])
def add_college():
    if request.is_json:
        data = request.get_json()
        name = data.get('collegename')
        code = data.get('code')
        add_college =  colleges_model.add_college(code, name)
        if add_college:
            return {'message': f"{code} - {name} added Successfully"}, 200
        else:
            return {'message': f"The Code {code} already exists"}, 400

    return {'message': "Bad Request"}, 400

@colleges.route('/edit', methods=['POST'])
def edit_college():
    if request.is_json:
        data = request.get_json()
        name = data.get('collegename')
        code = data.get('code')
        add_college =  colleges_model.edit_college_name(code, name)
        if add_college:
            return {'message': f"{code} - {name} added Successfully"}, 200
        else:
            return {'message': f"The Code {code} already exists"}, 400

    return {'message': "Bad Request"}, 400

@colleges.route('/delete', methods=['POST'])
def delete_college():
    if request.is_json:
        data = request.get_json()
        code = data.get('code')
        print(code)
        del_college = colleges_model.delete_college(code)
        if del_college:
            return {'message': f'College: {code} successfully deleted'}, 200
        else:
            return {'message': 'You cannot delete this college'}, 400
    
    else:    
        return {'message': 'Something went wrong'}, 400