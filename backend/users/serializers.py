from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "role", "phone"]


class RegisterSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["username", "password", "password2", "role"]
        extra_kwargs = {
            "password": {"write_only": True}
        }

    def validate(self, data):
        # ✅ password match
        if data["password"] != data["password2"]:
            raise serializers.ValidationError({
                "password": "Passwords do not match"
            })

        # ✅ role validation (THIS FIXES inventory manager error)
        allowed_roles = ["sales_staff", "inventory_manager"]
        if data.get("role") not in allowed_roles:
            raise serializers.ValidationError({
                "role": "Invalid role selected"
            })

        validate_password(data["password"])
        return data

    def create(self, validated_data):
        validated_data.pop("password2")
        user = User.objects.create_user(**validated_data)
        return user


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["username"] = user.username
        token["role"] = user.role
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        data["user"] = {
            "id": self.user.id,
            "username": self.user.username,
            "role": self.user.role,
        }
        return data
