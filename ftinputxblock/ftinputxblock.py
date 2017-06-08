"""TO-DO: Write a description of what this XBlock is."""

import pkg_resources

from xblock.core import XBlock
from xblock.fields import Scope, Integer, String
from xblock.fragment import Fragment

from webob.response import Response
from django.template import Context, Template


class FtInputXBlock(XBlock):
    """
    TO-DO: document what your XBlock does.
    """

    # Fields are defined on the class.  You can access them in your code as
    # self.<fieldname>.
    display_description = String(display_name="Description",
                                 default="Description",
                                 scope=Scope.settings)

    display_name = String(display_name="Name of the XBlock",
                          default="Text input problem type",
                          scope=Scope.settings)

    user_input = String(display_name="User input",
                        default="",
                        scope=Scope.user_state)

    question = String(display_name="Question",
                      default="Placeholder for question",
                      scope=Scope.settings)

    def resource_string(self, path):
        """Handy helper for getting resources from our kit."""
        data = pkg_resources.resource_string(__name__, path)
        return data.decode("utf8")

    # TO-DO: change this view to display your data your own way.
    def student_view(self, context=None):
        """
        The primary view of the FtInputXBlock, shown to students
        when viewing courses.
        """
        html = self.resource_string("static/html/ftinputxblock.html")
        frag = Fragment(html.format(self=self))
        frag.add_css(self.resource_string("static/css/ftinputxblock.css"))
        frag.add_javascript(self.resource_string("static/js/src/ftinputxblock.js"))
        frag.initialize_js('FtInputXBlock')
        return frag

    def studio_view(self, context=None):
        """
        Create a fragment used to display the edit view in the Studio.
        """
        template_str = self.resource_string("static/html/studio_view.html")
        template = Template(template_str)
        html = template.render(Context({
            'display_description': self.display_description,
            'display_name': self.display_name,
            'question': self.question
        }))

        frag = Fragment(html.format(self=self))
        frag.add_css(self.resource_string("static/css/studio_edit.css"))
        js_str = pkg_resources.resource_string(__name__, "static/js/src/studio_edit.js")
        frag.add_javascript(unicode(js_str))
        frag.initialize_js('StudioEditSubmit')
        return frag

    @XBlock.handler
    def studio_submit(self, request, suffix=''):
        """
        Called when submitting the form in Studio.
        """
        data = request.POST

        self.display_name = data['display_name']
        self.display_description = data['display_description']
        self.question = data['question']

        return Response(json_body={
            'result': "success"
        })

    @XBlock.json_handler
    def update_answer(self, data, suffix=''):
        self.user_input = data['user_input']

        return Response(json_body={
            'user_input': self.user_input
        })

    # TO-DO: change this to create the scenarios you'd like to see in the
    # workbench while developing your XBlock.
    @staticmethod
    def workbench_scenarios():
        """A canned scenario for display in the workbench."""
        return [
            ("FtInputXBlock",
             """<ftinputxblock/>
             """),
            ("Multiple FtInputXBlock",
             """<vertical_demo>
                <ftinputxblock/>
                <ftinputxblock/>
                <ftinputxblock/>
                </vertical_demo>
             """),
        ]
