from django import forms
from django.contrib.auth.forms import ReadOnlyPasswordHashField

from .models import FG

class FGCreationForm(forms.ModelForm):
    class Meta:
        model = FG
        fields = ('name', 'student_id', 'role')